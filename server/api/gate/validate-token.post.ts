import { getSupabaseServerClient } from '../../utils/supabase'

function normalizeExpiryMs(expaired: number): number {
  // 兼容：如果存的是秒级时间戳
  return expaired < 1_000_000_000_000 ? expaired * 1000 : expaired
}

function parseExpiryMs(expaired: unknown): number | null {
  if (expaired === null || expaired === undefined) return null

  let n: number
  if (typeof expaired === 'number') {
    n = expaired
  }
  else if (typeof expaired === 'string') {
    const s = expaired.trim()
    if (!s) return null

    if (/^\d+$/.test(s)) {
      n = Number(s)
    }
    else {
      const t = Date.parse(s)
      if (!Number.isFinite(t)) return null
      n = t
    }
  }
  else {
    return null
  }

  if (!Number.isFinite(n)) return null
  return normalizeExpiryMs(n)
}

function setGateCookies(event: Parameters<typeof eventHandler>[0], userId: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // 允许从微信/外部站点点击进入时的顶层跳转携带 cookie
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24
  }

  setCookie(event, 'gate_token_verified', 'true', cookieOptions)
  setCookie(event, 'gate_user_id', userId, cookieOptions)
}

function devReason(reason: string, detail?: string) {
  if (process.env.NODE_ENV === 'production') return {}
  return { reason, detail }
}

function normalizeToken(raw: unknown): string {
  if (typeof raw !== 'string') return ''

  // 一些设备/渠道会把 query 里的 `+` 解析成空格，这里做兜底
  // 以及去掉首尾空白
  const trimmed = raw.trim()
  if (!trimmed) return ''

  return trimmed.replace(/\s+/g, '+')
}

function parseBearerToken(authHeader: string | undefined): string {
  if (!authHeader) return ''
  const m = authHeader.match(/^Bearer\s+(.+)$/i)
  return m ? m[1] : ''
}

export default eventHandler(async (event) => {
  const body = await readBody(event) || {}
  const rawToken = (body as Record<string, unknown>)?.token

  const tokenFromQuery = (getQuery(event) as Record<string, unknown>)?.token
  const tokenFromHeader = parseBearerToken(getHeader(event, 'authorization'))

  const token = normalizeToken(rawToken) || normalizeToken(tokenFromQuery) || normalizeToken(tokenFromHeader)
  if (!token) {
    return { valid: false, ...devReason('missing_token') }
  }

  const supabase = getSupabaseServerClient()

  // 先查 token 记录（limit(1) 避免 token 重复时 maybeSingle 报错导致“看起来像验证不通过”）
  const { data, error } = await supabase
    .from('tokens')
    .select('id,type,used,expaired,user_id')
    .eq('token', token)
    .limit(1)
    .maybeSingle()

  if (error) {
    return { valid: false, ...devReason('db_error', error.message) }
  }

  if (!data) {
    return { valid: false, ...devReason('not_found') }
  }

  const type = (data.type || '').toString()

  // type=cnt：一次性领取；但在多设备/重复打开的情况下，允许在 24h 内幂等通过（用 expaird 兜底）
  if (type === 'cnt') {
    const expiresAtSec = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    // 已经被领取过：如果能拿到 user_id，就按有效会话处理
    if (data.used) {
      if (data.user_id === null || data.user_id === undefined) {
        return { valid: false, ...devReason('already_used') }
      }

      // 如果没有设置过期时间，补一个 24h（仅作为兼容兜底）
      if (data.expaired === null || data.expaired === undefined) {
        await supabase
          .from('tokens')
          .update({ expaired: expiresAtSec })
          .eq('id', data.id)
      }
      else {
        const exp = parseExpiryMs(data.expaired)
        if (!(exp && exp > Date.now())) {
          return { valid: false, ...devReason('expired') }
        }
      }

      const userId = String(data.user_id)
      setGateCookies(event, userId)
      return { valid: true, user_id: userId }
    }

    const updatePayload: Record<string, unknown> = { used: true }
    if (data.expaired === null || data.expaired === undefined) {
      updatePayload.expaired = expiresAtSec
    }

    const { data: redeemed, error: redeemError } = await supabase
      .from('tokens')
      .update(updatePayload)
      .eq('id', data.id)
      .select('user_id')
      .maybeSingle()

    if (redeemError) {
      return { valid: false, ...devReason('redeem_error', redeemError.message) }
    }

    if (!redeemed || redeemed.user_id === null || redeemed.user_id === undefined) {
      // 并发下被别人先领取了
      return { valid: false, ...devReason('already_used') }
    }

    const userId = String(redeemed.user_id)
    setGateCookies(event, userId)
    return { valid: true, user_id: userId }
  }

  // type 为空/非 cnt：校验 expaird（过期时间）
  if (data.expaired === null || data.expaired === undefined) {
    return { valid: false, ...devReason('missing_expaired') }
  }

  const exp = parseExpiryMs(data.expaired)
  const valid = !!(exp && exp > Date.now())

  if (!valid) {
    return { valid: false, ...devReason('expired') }
  }

  const userId = String(data.user_id)
  setGateCookies(event, userId)

  return { valid: true, user_id: userId }
})

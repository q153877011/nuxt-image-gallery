import { getSupabaseServerClient } from '../utils/supabase'

function normalizeExpiryMs(expaired: number): number {
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

function setGateCookies(event: Parameters<typeof defineEventHandler>[0], userId: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // 允许从微信/外部站点点击进入时的顶层跳转携带 cookie
    // strict 会导致首次进入后的 302 清理 token 时 cookie 不一定会被带上
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24
  }

  setCookie(event, 'gate_token_verified', 'true', cookieOptions)
  setCookie(event, 'gate_user_id', userId, cookieOptions)
}

function normalizeToken(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  const trimmed = raw.trim()
  if (!trimmed) return ''
  // 一些设备/渠道会把 query 里的 `+` 解析成空格，这里做兜底
  return trimmed.replace(/\s+/g, '+')
}

async function validateTokenAndGetUserId(rawToken: string): Promise<string | null> {
  const token = normalizeToken(rawToken)
  if (!token) return null

  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('tokens')
    .select('id,type,used,expaired,user_id')
    .eq('token', token)
    .limit(1)
    .maybeSingle()

  if (error || !data) return null

  const type = (data.type || '').toString()

  if (type === 'cnt') {
    const expiresAtSec = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    // 已领取：允许在 24h 内幂等通过（多设备/重复打开）
    if (data.used) {
      if (data.user_id === null || data.user_id === undefined) return null

      if (data.expaired === null || data.expaired === undefined) {
        await supabase
          .from('tokens')
          .update({ expaired: expiresAtSec })
          .eq('id', data.id)
      }
      else {
        const exp = parseExpiryMs(data.expaired)
        if (!(exp && exp > Date.now())) return null
      }

      return String(data.user_id)
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

    if (redeemError || !redeemed || redeemed.user_id === null || redeemed.user_id === undefined) {
      return null
    }

    return String(redeemed.user_id)
  }

  if (data.expaired === null || data.expaired === undefined) return null

  const exp = parseExpiryMs(data.expaired)
  if (!(exp && exp > Date.now())) return null

  return String(data.user_id)
}

export default defineEventHandler(async (event) => {
  // 开发模式下跳过 gate 验证，方便本地调试
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const url = getRequestURL(event)
  const path = url.pathname

  // 允许静态资源与 Nuxt 构建产物
  if (
    path.startsWith('/_nuxt/') ||
    path === '/favicon.ico' ||
    path === '/robots.txt' ||
    path === '/sitemap.xml'
  ) {
    return
  }

  // 放行 gate 提示页
  if (path === '/gate') {
    return
  }

  // 放行 gate 自己的 API
  if (path === '/api/gate/validate-token' || path === '/api/gate/me') {
    return
  }

  // 已有 24h 会话：放行
  const verified = getCookie(event, 'gate_token_verified')
  const cookieUserId = getCookie(event, 'gate_user_id')
  if (verified === 'true' && typeof cookieUserId === 'string' && cookieUserId.length > 0) {
    return
  }

  // 无会话但 URL 带 token：在服务端直接校验并下发 HttpOnly cookie，然后重定向清理 token
  const token = url.searchParams.get('token')
  if (token && normalizeToken(token)) {
    const userId = await validateTokenAndGetUserId(token)
    if (!userId) {
      return sendRedirect(event, '/gate', 302)
    }

    setGateCookies(event, userId)

    // 重定向：移除 token，补齐 user_id
    const next = new URL(url.toString())
    next.searchParams.delete('token')
    if (!next.searchParams.get('user_id')) {
      next.searchParams.set('user_id', userId)
    }

    return sendRedirect(event, next.pathname + next.search, 302)
  }

  // 无会话且无 token：跳到 gate
  return sendRedirect(event, '/gate', 302)
})

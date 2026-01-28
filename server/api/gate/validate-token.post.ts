import { getSupabaseServerClient } from '../../utils/supabase'

function normalizeExpiryMs(expaired: number): number {
  // 兼容：如果存的是秒级时间戳
  return expaired < 1_000_000_000_000 ? expaired * 1000 : expaired
}

function setGateCookies(event: Parameters<typeof eventHandler>[0], userId: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
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

export default eventHandler(async (event) => {
  const body = await readBody(event) || {}
  const rawToken = (body as Record<string, unknown>)?.token

  const token = typeof rawToken === 'string' ? rawToken.trim() : ''
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

  // type=cnt：一次性领取；首次成功后由 HttpOnly cookie 保持 24h 会话
  if (type === 'cnt') {
    if (data.used) {
      return { valid: false, ...devReason('already_used') }
    }

    const { data: redeemed, error: redeemError } = await supabase
      .from('tokens')
      .update({ used: true })
      .eq('id', data.id)
      .or('used.is.null,used.eq.false')
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

  const exp = normalizeExpiryMs(Number(data.expaired))
  const valid = exp > Date.now()

  if (!valid) {
    return { valid: false, ...devReason('expired') }
  }

  const userId = String(data.user_id)
  setGateCookies(event, userId)

  return { valid: true, user_id: userId }
})

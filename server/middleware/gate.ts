import { getSupabaseServerClient } from '../utils/supabase'

function normalizeExpiryMs(expaired: number): number {
  return expaired < 1_000_000_000_000 ? expaired * 1000 : expaired
}

function setGateCookies(event: Parameters<typeof defineEventHandler>[0], userId: string) {
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

async function validateTokenAndGetUserId(token: string): Promise<string | null> {
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
    if (data.used) return null

    const { data: redeemed, error: redeemError } = await supabase
      .from('tokens')
      .update({ used: true })
      .eq('id', data.id)
      .or('used.is.null,used.eq.false')
      .select('user_id')
      .maybeSingle()

    if (redeemError || !redeemed || redeemed.user_id === null || redeemed.user_id === undefined) {
      return null
    }

    return String(redeemed.user_id)
  }

  if (data.expaired === null || data.expaired === undefined) return null

  const exp = normalizeExpiryMs(Number(data.expaired))
  if (!(exp > Date.now())) return null

  return String(data.user_id)
}

export default defineEventHandler(async (event) => {
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
  if (token && token.trim().length > 0) {
    const userId = await validateTokenAndGetUserId(token.trim())
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

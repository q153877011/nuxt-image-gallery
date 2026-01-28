export default defineNuxtRouteMiddleware(async (to) => {
  // SSR 阶段由 server/middleware/gate.ts 处理；这里仅处理客户端路由跳转
  if (import.meta.server) {
    return
  }

  // /gate 只是提示页：允许直接访问
  if (to.path === '/gate') {
    return
  }

  const token = typeof to.query.token === 'string' ? to.query.token : undefined

  async function getGateSession(): Promise<{ verified: boolean, user_id?: string }> {
    try {
      return await $fetch<{ verified: boolean, user_id?: string }>('/api/gate/me', { method: 'GET' })
    }
    catch {
      return { verified: false }
    }
  }

  function ensureUserIdInQuery(userId: string) {
    const raw = to.query.user_id
    const current = Array.isArray(raw) ? raw[0] : raw
    if (typeof current === 'string' && current.length > 0) {
      return
    }

    const nextQuery = { ...to.query } as Record<string, unknown>
    nextQuery.user_id = userId
    if (token) {
      delete nextQuery.token
    }

    return navigateTo({ path: to.path, query: nextQuery })
  }

  // 0) 如果已经在 24h 会话内：不需要再校验 token；只做清理 URL token + 补齐 user_id
  const session = await getGateSession()
  if (session.verified && typeof session.user_id === 'string' && session.user_id.length > 0) {
    if (token) {
      const nextQuery = { ...to.query } as Record<string, unknown>
      delete nextQuery.token
      if (!nextQuery.user_id) {
        nextQuery.user_id = session.user_id
      }
      return navigateTo({ path: to.path, query: nextQuery })
    }

    return ensureUserIdInQuery(session.user_id)
  }

  // 1) 没有会话时：如果 URL 上带 token，就必须先校验（由服务端下发 HttpOnly cookie）
  if (token) {
    try {
      const result = await $fetch<{ valid: boolean, user_id?: string }>('/api/gate/validate-token', {
        method: 'POST',
        body: { token }
      })

      if (result.valid && typeof result.user_id === 'string' && result.user_id.length > 0) {
        const nextQuery = { ...to.query } as Record<string, unknown>
        delete nextQuery.token
        if (!nextQuery.user_id) {
          nextQuery.user_id = result.user_id
        }

        return navigateTo({ path: to.path, query: nextQuery })
      }

      return navigateTo('/gate')
    }
    catch {
      return navigateTo('/gate')
    }
  }

  // 2) 没有 token 且没有会话：跳到 gate
  return navigateTo('/gate')
})

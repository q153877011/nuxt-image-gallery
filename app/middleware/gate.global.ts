export default defineNuxtRouteMiddleware(async (to) => {
  // 允许访问 /gate 页面本身
  if (to.path === '/gate') {
    return
  }

  // 允许访问 API 路由（除了验证接口本身，但允许 token 验证接口）
  if (to.path.startsWith('/api/') && !to.path.startsWith('/api/gate/verify')) {
    return
  }

  // 允许访问静态资源
  if (
    to.path.startsWith('/_nuxt/')
    || to.path.startsWith('/favicon.ico')
    || to.path.startsWith('/logo.svg')
    || to.path.startsWith('/social-card.png')
    || to.path.startsWith('/_robots.txt')
  ) {
    return
  }

  // 检查 cookie 中是否有验证通过的标记（密码验证）
  const verified = useCookie('gate_verified', {
    httpOnly: false, // 需要在客户端也能读取
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  // 检查验证状态：支持字符串 'true' 或布尔值 true
  if (String(verified.value) == 'true') {
    // 密码验证通过，允许访问所有页面（包括管理页面）
    return
  }

  // 检查是否有 token 验证标记
  const tokenVerified = useCookie('gate_token_verified', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 小时
  })
  // 检查 URL 中的 token 参数（一次性访问链接）
  const token = to.query.token as string | undefined
  if (token) {
    // 验证 token 是否有效（通过 API，因为中间件可能在客户端执行）
    try {
      const result = await $fetch<{ valid: boolean }>('/api/gate/validate-token', {
        method: 'POST',
        body: { token }
      })
      if (result.valid) {
        // Token 有效，设置临时 cookie 允许访问
        tokenVerified.value = 'true'
        // 如果访问的是管理页面，重定向到首页
        if (to.path.startsWith('/admin/')) {
          return navigateTo('/')
        }
        // 允许访问
        return
      }
    }
    catch (err) {
      console.log(err)
      // Token 验证失败，继续检查
    }
  }

  // 检查 token 验证状态：支持字符串 'true' 或布尔值 true
  if (String(tokenVerified.value) == 'true') {
    // Token 验证通过，但不能访问管理页面
    if (to.path.startsWith('/admin/')) {
      return navigateTo('/')
    }
    // 允许访问其他页面
    return
  }

  // 未验证，重定向到 /gate
  return navigateTo('/gate')
})

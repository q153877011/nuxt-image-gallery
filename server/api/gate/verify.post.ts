export default eventHandler(async (event) => {
  // 使用更健壮的方式读取 body，兼容 Vercel 边缘环境
  let body: Record<string, unknown> = {}
  let password: string | undefined

  try {
    body = (await readBody(event)) as Record<string, unknown>
    password = body?.password as string | undefined
  }
  catch {
    // 如果 readBody 失败，尝试从原始请求中读取
    try {
      const rawBody = await readRawBody(event, 'utf8')
      if (rawBody) {
        body = JSON.parse(rawBody) as Record<string, unknown>
        password = body?.password as string | undefined
      }
    }
    catch {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to parse request body'
      })
    }
  }

  // 验证 password 是否存在
  if (!password || typeof password !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is required'
    })
  }

  console.log(process.env.NUXT_GATE_PASSWORD)
  // 从环境变量获取 gate 密码
  // 如果没有设置，使用默认值（仅用于开发，生产环境必须设置）
  const gatePassword = process.env.NUXT_GATE_PASSWORD || 'gate123'

  // 防暴力破解：检查请求频率（简单实现，可以改进为使用 Redis 等）
  const session = await getUserSession(event)
  if (session.lastAttemptAt && typeof session.lastAttemptAt === 'number' && Date.now() - session.lastAttemptAt < 5000) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests'
    })
  }

  // 验证密码
  if (password === gatePassword) {
    // 验证成功，设置 cookie
    // 设置 cookie 有效期为 24 小时
    // httpOnly: false 允许客户端 JavaScript 读取（中间件需要在客户端检查）
    setCookie(event, 'gate_verified', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 小时
    })

    // 清除失败尝试记录
    await setUserSession(event, {})

    return { verified: true }
  }

  // 记录失败尝试
  await setUserSession(event, { lastAttemptAt: Date.now() })

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid password'
  })
})

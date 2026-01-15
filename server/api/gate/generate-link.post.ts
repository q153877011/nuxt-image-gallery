export default eventHandler(async (event) => {
  // 检查用户是否已通过密码验证
  const verified = getCookie(event, 'gate_verified')
  if (verified !== 'true') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Please verify password first.'
    })
  }

  // 生成 token（24小时有效）
  const token = await createToken(24)

  // 获取当前域名和协议
  const host = getHeader(event, 'host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  // 生成访问链接
  const accessLink = `${protocol}://${host}/?token=${token}`

  return {
    success: true,
    token,
    accessLink,
    expiresIn: '24 hours'
  }
})

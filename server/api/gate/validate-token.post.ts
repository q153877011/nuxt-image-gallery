import { validateToken } from '../../utils/token-store'

export default eventHandler(async (event) => {
  console.log('validate-token ---->', event)
  const body = await readBody(event) || {}
  const { token } = body

  if (!token || typeof token !== 'string') {
    return { valid: false }
  }

  // 验证 token 是否有效
  const valid = validateToken(token)

  return { valid }
})

import { getImageKeysFromKV } from '../utils/images-store'

export default eventHandler(async (event) => {
  // 只允许已通过 gate 密码或 token 邀请的用户读取
  const gateVerified = getCookie(event, 'gate_verified')
  const tokenVerified = getCookie(event, 'gate_token_verified')

  const authed = gateVerified === 'true' || tokenVerified === 'true'
  if (!authed) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const keys = await getImageKeysFromKV()

  return {
    keys
  }
})

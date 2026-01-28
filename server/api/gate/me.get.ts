export default eventHandler(async (event) => {
  const verified = getCookie(event, 'gate_token_verified')
  const userId = getCookie(event, 'gate_user_id')

  if (verified === 'true' && typeof userId === 'string' && userId.length > 0) {
    return { verified: true, user_id: userId }
  }

  return { verified: false }
})

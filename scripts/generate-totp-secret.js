/**
 * 生成 TOTP Secret 工具脚本
 * 
 * 使用方法:
 * node scripts/generate-totp-secret.js
 * 
 * 或者使用 pnpm:
 * pnpm exec node scripts/generate-totp-secret.js
 */

const speakeasy = require('speakeasy')

// 生成一个随机的 base32 编码的 secret
const secret = speakeasy.generateSecret({
  name: 'Nuxt Image Gallery',
  length: 32
})

console.log('\n=== TOTP Secret 生成成功 ===\n')
console.log('Secret (Base32):', secret.base32)
console.log('\n请将以下内容添加到你的 .env 文件中:')
console.log(`NUXT_TOTP_SECRET=${secret.base32}\n`)
console.log('然后使用以下二维码或 secret 在您的身份验证器应用中添加:')
console.log('QR Code URL:', secret.otpauth_url)
console.log('\n推荐使用以下身份验证器应用:')
console.log('- Google Authenticator')
console.log('- Microsoft Authenticator')
console.log('- Authy')
console.log('- 1Password')
console.log('\n')


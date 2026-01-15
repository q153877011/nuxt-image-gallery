/**
 * Token 存储工具
 * 用于存储和管理一次性访问链接的 token
 * 注意：这是内存存储，服务器重启后数据会丢失
 * 生产环境建议使用 Redis 或数据库
 */
// import { get, set, has } from '@vercel/edge-config'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
interface TokenInfo {
  token: string
  createdAt: number
  expiresAt: number
  used: boolean
}

export async function getTokens(): Promise<TokenInfo[]> {
  if (!await redis.exists('tokens')) {
    await redis.set('tokens', [])
  }
  const tokens = await redis.get('tokens')
  return tokens as unknown as TokenInfo[]
}

// 清理过期 token（每10分钟执行一次）
setInterval(async () => {
  const now = Date.now()
  const tokens = await getTokens()
  for (const token of tokens) {
    if (token.expiresAt < now) {
      await deleteToken(token.token)
    }
  }
}, 10 * 60 * 1000) // 10分钟

/**
 * 生成新的 token
 */
export function generateToken(): string {
  // 生成随机 token（32字符）
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

/**
 * 创建 token 并存储
 * @param expiresInHours 过期时间（小时），默认24小时
 */
export async function createToken(expiresInHours: number = 24): Promise<string> {
  const token = generateToken()
  const now = Date.now()
  const expiresAt = now + (expiresInHours * 60 * 60 * 1000)

  const tokens = await getTokens()
  tokens.push({
    token,
    createdAt: now,
    expiresAt,
    used: false
  })
  await redis.set('tokens', tokens)
  return token
}

/**
 * 验证 token 是否有效
 */
export async function validateToken(token: string): Promise<boolean> {
  const tokens = await getTokens()
  const info = tokens.find(t => t.token === token)
  if (!info) {
    return false
  }

  // 检查是否过期
  if (info.expiresAt < Date.now()) {
    await redis.set('tokens', tokens.filter(t => t.token !== token))
    return false
  }

  // 检查是否已使用（可选，如果需要一次性使用）
  // if (info.used) {
  //   return false
  // }

  return true
}

/**
 * 标记 token 为已使用
 */
export async function markTokenAsUsed(token: string): Promise<void> {
  const tokens = await getTokens()
  const info = tokens.find(t => t.token === token)
  if (info) {
    info.used = true
    await redis.set('tokens', tokens.map(t => t.token === token ? { ...t, used: true } : t))
  }
}

/**
 * 删除 token
 */
export async function deleteToken(token: string): Promise<void> {
  const tokens = await getTokens()
  await redis.set('tokens', tokens.filter(t => t.token !== token))
}

/**
 * 获取所有 token（用于管理页面）
 */
export async function getAllTokens(): Promise<TokenInfo[]> {
  const tokens = await getTokens()
  return tokens
}

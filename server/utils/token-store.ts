/**
 * Token 存储工具
 * 用于存储和管理一次性访问链接的 token
 * 注意：这是内存存储，服务器重启后数据会丢失
 * 生产环境建议使用 Redis 或数据库
 */

interface TokenInfo {
  token: string
  createdAt: number
  expiresAt: number
  used: boolean
}

// 内存存储 token
const tokenStore = new Map<string, TokenInfo>()

// 清理过期 token（每10分钟执行一次）
setInterval(() => {
  const now = Date.now()
  for (const [token, info] of tokenStore.entries()) {
    if (info.expiresAt < now) {
      tokenStore.delete(token)
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
export function createToken(expiresInHours: number = 24): string {
  const token = generateToken()
  const now = Date.now()
  const expiresAt = now + (expiresInHours * 60 * 60 * 1000)

  tokenStore.set(token, {
    token,
    createdAt: now,
    expiresAt,
    used: false
  })

  return token
}

/**
 * 验证 token 是否有效
 */
export function validateToken(token: string): boolean {
  const info = tokenStore.get(token)

  if (!info) {
    return false
  }

  // 检查是否过期
  if (info.expiresAt < Date.now()) {
    tokenStore.delete(token)
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
export function markTokenAsUsed(token: string): void {
  const info = tokenStore.get(token)
  if (info) {
    info.used = true
  }
}

/**
 * 删除 token
 */
export function deleteToken(token: string): void {
  tokenStore.delete(token)
}

/**
 * 获取所有 token（用于管理页面）
 */
export function getAllTokens(): TokenInfo[] {
  return Array.from(tokenStore.values())
}


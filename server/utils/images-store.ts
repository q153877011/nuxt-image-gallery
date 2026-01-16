import { Redis } from '@upstash/redis'

interface ImagesInfo {
  lists: string[];
  updatedAt: string;
  count: number;
}

const redis = Redis.fromEnv()

function getImagesKeyName(): string {
  const keyName = process.env.IMAGES_KEY
  if (!keyName || typeof keyName !== 'string') {
    throw createError({
      statusCode: 500,
      statusMessage: 'IMAGES_KEY is not set'
    })
  }
  return keyName
}

function normalizeStringArray(value: ImagesInfo): string[] {
  try {
    return value.lists
  }
  catch {
    console.error('Failed to parse images list from KV')
    // ignore
  }

  return []
}

/**
 * 从 KV 读取图片 key 列表。
 * - Redis 存储值建议为 JSON 数组（例如 ["a.webp", "b.webp"]）
 * - `.env` 中用 IMAGES_KEY 指定 Redis 的 key 名称
 */
export async function getImageKeysFromKV(): Promise<string[]> {
  const keyName = getImagesKeyName()

  const exists = await redis.exists(keyName)
  if (!exists) {
    // 初始化为空数组，便于后续写入
    await redis.set(keyName, [])
    return []
  }

  const value = await redis.get(keyName)
  return normalizeStringArray(value)
}

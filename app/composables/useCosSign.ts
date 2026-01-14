import type { ImageItem } from '../config/images'

/**
 * COS 签名链接缓存
 */
interface CacheItem {
  url: string
  expiresAt: number
}

const urlCache = new Map<string, CacheItem>()

/**
 * 获取 COS 签名链接
 * @param key COS key
 * @param forceRefresh 是否强制刷新缓存
 * @returns 签名后的 URL
 */
export async function useCosSign(key: string, forceRefresh = false): Promise<string> {
  // 检查缓存
  if (!forceRefresh) {
    const cached = urlCache.get(key)
    if (cached && cached.expiresAt > Date.now()) {
      return cached.url
    }
  }

  try {
    interface CosSignResponse {
      url: string
      expires: number
    }
    const response = await $fetch<CosSignResponse>('/api/cos-sign', {
      method: 'GET',
      params: { key }
    })

    // 缓存签名链接（提前 10 秒过期，确保安全）
    const expiresAt = Date.now() + (response.expires - 10) * 1000
    urlCache.set(key, {
      url: response.url,
      expiresAt
    })

    return response.url
  }
  catch (error) {
    console.error('Failed to get COS signed URL:', error)
    throw error
  }
}

/**
 * 批量获取多个图片的签名链接
 * @param images 图片列表
 * @returns 带有签名 URL 的图片列表
 */
export async function useCosSignBatch(images: ImageItem[]): Promise<ImageItem[]> {
  const signedImages = await Promise.all(
    images.map(async (image) => {
      try {
        const signedUrl = await useCosSign(image.key)
        return {
          ...image,
          url: signedUrl
        }
      }
      catch (error) {
        console.error(`Failed to sign image ${image.key}:`, error)
        // 返回原始图片，但标记为错误
        return {
          ...image,
          url: undefined
        }
      }
    })
  )

  return signedImages
}

/**
 * 清除指定 key 的缓存
 */
export function clearCosSignCache(key?: string) {
  if (key) {
    urlCache.delete(key)
  }
  else {
    urlCache.clear()
  }
}

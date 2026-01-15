/**
 * 图片缓存工具
 * 使用 Cache API 缓存图片，缓存时间为 1 天
 */

const CACHE_NAME = 'image-cache-v1'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 1 天（毫秒）

/**
 * 获取缓存的图片 URL
 * @param imageUrl 原始图片 URL
 * @returns 缓存的图片 URL（blob URL）
 */
export async function getCachedImageUrl(imageUrl: string): Promise<string> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    // 服务器端或不支持 Cache API，直接返回原 URL
    return imageUrl
  }

  try {
    // 打开缓存
    const cache = await caches.open(CACHE_NAME)

    // 检查缓存中是否有该图片
    const cachedResponse = await cache.match(imageUrl)

    if (cachedResponse) {
      // 检查缓存是否过期
      const cachedTime = cachedResponse.headers.get('X-Cached-Time')
      if (cachedTime) {
        const cacheAge = Date.now() - Number.parseInt(cachedTime)
        if (cacheAge < CACHE_DURATION) {
          // 缓存未过期，返回 blob URL
          const blob = await cachedResponse.blob()
          return URL.createObjectURL(blob)
        }
        else {
          // 缓存已过期，删除旧缓存
          await cache.delete(imageUrl)
        }
      }
    }

    // 缓存中没有或已过期，重新获取图片
    const response = await fetch(imageUrl, {
      cache: 'no-cache' // 不使用浏览器默认缓存
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    // 克隆响应以便缓存
    const responseToCache = response.clone()

    // 添加缓存时间戳到响应头
    const headers = new Headers(responseToCache.headers)
    headers.set('X-Cached-Time', String(Date.now()))

    // 创建新的响应对象
    const cachedResponseWithTime = new Response(responseToCache.body, {
      status: responseToCache.status,
      statusText: responseToCache.statusText,
      headers
    })

    // 存储到缓存
    await cache.put(imageUrl, cachedResponseWithTime)

    // 返回 blob URL
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  }
  catch (error) {
    console.error('Failed to cache image:', error)
    // 如果缓存失败，返回原始 URL
    return imageUrl
  }
}

/**
 * 清除所有图片缓存
 */
export async function clearImageCache(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return
  }

  try {
    await caches.delete(CACHE_NAME)
  }
  catch (error) {
    console.error('Failed to clear image cache:', error)
  }
}

/**
 * 清除过期的图片缓存
 */
export async function clearExpiredImageCache(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return
  }

  try {
    const cache = await caches.open(CACHE_NAME)
    const keys = await cache.keys()

    for (const request of keys) {
      const response = await cache.match(request)
      if (response) {
        const cachedTime = response.headers.get('X-Cached-Time')
        if (cachedTime) {
          const cacheAge = Date.now() - Number.parseInt(cachedTime)
          if (cacheAge >= CACHE_DURATION) {
            await cache.delete(request)
          }
        }
      }
    }
  }
  catch (error) {
    console.error('Failed to clear expired image cache:', error)
  }
}


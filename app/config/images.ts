/**
 * 图片配置
 *
 * 说明：图片 key 列表从 KV 读取（见 `server/api/images.get.ts`），这里保留类型与工具函数。
 * KV 中存储的是 COS object key 数组，例如：
 * ["folder/a.webp", "folder/b.webp"]
 */

/**
 * 从完整 URL 中提取 COS key（用于迁移旧配置）
 */
export function extractCosKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    // 移除开头的斜杠
    return urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname
  }
  catch {
    return null
  }
}

/**
 * 图片接口定义
 */
export interface ImageItem {
  id: string
  key: string // COS key，用于获取签名链接
  url?: string // 签名后的 URL（动态生成）

  // 计数类字段来自 Supabase（int8），可能会以 string 返回
  good?: string | number | null
  view_cnt?: string | number | null
}

/**
 * 将 key 列表转换为图片对象数组
 */
export function buildImageList(keys: string[]): ImageItem[] {
  return keys.map((key, index) => ({
    id: String(index),
    key
  }))
}

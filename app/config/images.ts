/**
 * 图片配置 - 使用 COS key（而不是完整 URL）
 * 图片将通过后端签名接口获取临时访问链接，防止盗用
 */
export const imageKeys = [
  // COS key 列表，例如：'images/photo1.jpg' 或 'wedding-photos/qwy-zlx/9.1931702.jpg'
  'avator.jpg',
  'avator.jpg',
  'images/9.1931706-1768373630795-b275c429.webp'
  // 'pexels-ruben-boekeloo-521336009-34443561.jpg',
  // 'wedding-photos/qwy-zlx/9.1931702.jpg',
  // 'wedding-photos/qwy-zlx/9.1931706.jpg',
  // 'wedding-photos/qwy-zlx/9.1931712.jpg',
  // 'wedding-photos/qwy-zlx/9.1931733.jpg',
  // 'wedding-photos/qwy-zlx/9.1931769.jpg',
  // 'wedding-photos/qwy-zlx/9.1931780.jpg',
  // 'wedding-photos/qwy-zlx/9.1931802.jpg',
  // 'wedding-photos/qwy-zlx/9.1931804.jpg',
  // 'wedding-photos/qwy-zlx/9.1931818.jpg',
  // 'wedding-photos/qwy-zlx/9.1931851.jpg',
  // 'wedding-photos/qwy-zlx/9.1931892.jpg',
  // 'wedding-photos/qwy-zlx/9.1931896.jpg',
  // 'wedding-photos/qwy-zlx/9.1931911.jpg',
  // 'wedding-photos/qwy-zlx/9.1931920.jpg',
  // 'wedding-photos/qwy-zlx/9.1931951.jpg',
  // 'wedding-photos/qwy-zlx/9.1931960.jpg',
  // 'wedding-photos/qwy-zlx/9.1931970.jpg',
  // 'wedding-photos/qwy-zlx/F39A8337.jpg',
  // 'wedding-photos/qwy-zlx/F39A8367.jpg',
  // 'wedding-photos/qwy-zlx/F39A8384.jpg',
  // 'wedding-photos/qwy-zlx/F39A8406.jpg',
  // 'wedding-photos/qwy-zlx/F39A8426.jpg',
  // 'wedding-photos/qwy-zlx/F39A8483.jpg',
  // 'wedding-photos/qwy-zlx/F39A8569.jpg',
  // 'wedding-photos/qwy-zlx/F39A8596.jpg',
  // 'wedding-photos/qwy-zlx/F39A8620.jpg',
  // 'wedding-photos/qwy-zlx/F39A8633.jpg',
  // 'wedding-photos/qwy-zlx/F39A8667.jpg',
  // 'wedding-photos/qwy-zlx/F39A8669.jpg',
  // 'wedding-photos/qwy-zlx/F39A8760.jpg',
  // 'wedding-photos/qwy-zlx/F39A8790.jpg',
  // 'wedding-photos/qwy-zlx/F39A8856.jpg',
  // 'wedding-photos/qwy-zlx/F39A9028.jpg',
  // 'wedding-photos/qwy-zlx/F39A9106.jpg',
  // 'wedding-photos/qwy-zlx/F39A9161.jpg',
  // 'wedding-photos/qwy-zlx/F39A9173.jpg',
  // 'wedding-photos/qwy-zlx/F39A9184.jpg'
]

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
}

/**
 * 将 key 列表转换为图片对象数组
 */
export function getImageList(): ImageItem[] {
  return imageKeys.map((key, index) => ({
    id: String(index),
    key
  }))
}

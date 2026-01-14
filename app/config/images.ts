/**
 * 图片配置 - 使用 COS key（而不是完整 URL）
 * 图片将通过后端签名接口获取临时访问链接，防止盗用
 */
export const imageKeys = [
  'qwy-zlx/9.1931702-1768391001874-a806b928.webp',
  'qwy-zlx/9.1931706-1768391006019-aee4b102.webp',
  'qwy-zlx/9.1931712-1768391009846-c9ee7aca.webp',
  'qwy-zlx/9.1931733-1768391013698-0b5d4baa.webp',
  'qwy-zlx/9.1931769-1768391017807-1aa73340.webp',
  'qwy-zlx/9.1931780-1768391021940-27872afa.webp',
  'qwy-zlx/9.1931802-1768391025816-571efc69.webp',
  'qwy-zlx/9.1931804-1768391029772-a1b9675a.webp',
  'qwy-zlx/9.1931818-1768391033831-7fc7681f.webp',
  'qwy-zlx/9.1931851-1768391038198-6f3c157a.webp',
  'qwy-zlx/9.1931892-1768391042854-7c1faf62.webp',
  'qwy-zlx/9.1931896-1768391047437-92e8a123.webp',
  'qwy-zlx/9.1931911-1768391052201-123b0a9f.webp',
  'qwy-zlx/9.1931920-1768391057280-ba54f3d0.webp',
  'qwy-zlx/9.1931951-1768391062298-effc1126.webp',
  'qwy-zlx/9.1931960-1768391066891-50155d6e.webp',
  'qwy-zlx/9.1931970-1768391071752-5dd5d11e.webp',
  'qwy-zlx/F39A8337-1768391076658-3a9f0a94.webp',
  'qwy-zlx/F39A8367-1768391081269-0d4a439a.webp',
  'qwy-zlx/F39A8384-1768391086090-eda755b7.webp',
  'qwy-zlx/F39A8406-1768391090707-dea9f85b.webp',
  'qwy-zlx/F39A8426-1768391095387-0c5d1f36.webp',
  'qwy-zlx/F39A8483-1768391103845-db98850b.webp',
  'qwy-zlx/F39A8569-1768391108373-3c8b95da.webp',
  'qwy-zlx/F39A8596-1768391113097-bdc2ebd3.webp',
  'qwy-zlx/F39A8620-1768391117952-e5eba164.webp',
  'qwy-zlx/F39A8633-1768391122391-41bbfb48.webp',
  'qwy-zlx/F39A8760-1768391126831-c4bfdeaf.webp',
  'qwy-zlx/F39A8790-1768391131299-bbddbf09.webp',
  'qwy-zlx/F39A8856-1768391135902-33077ec6.webp',
  'qwy-zlx/F39A9028-1768391140486-0c1d62ed.webp',
  'qwy-zlx/F39A9106-1768391145234-724931f1.webp',
  'qwy-zlx/F39A9161-1768391149960-0256dcad.webp',
  'qwy-zlx/F39A9173-1768391154589-3fed1a64.webp',
  'qwy-zlx/F39A9184-1768391159212-20ed88e6.webp'
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

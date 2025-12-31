/**
 * 图片URL列表配置
 * 在这里维护你要展示的图片URL列表
 */
export const imageUrls = [
  // 示例URL，请替换为你的实际图片URL
  'https://wedding-1256820579.cos.ap-chengdu.myqcloud.com/avator.jpg',
  'https://wedding-1256820579.cos.ap-chengdu.myqcloud.com/avator.jpg',
  'https://wedding-1256820579.cos.ap-chengdu.myqcloud.com/pexels-ruben-boekeloo-521336009-34443561.jpg',
]

/**
 * 图片接口定义
 */
export interface ImageItem {
  id: string
  url: string
}

/**
 * 将URL列表转换为图片对象数组
 */
export function getImageList(): ImageItem[] {
  return imageUrls.map((url, index) => ({
    id: String(index),
    urlc
  }))
}


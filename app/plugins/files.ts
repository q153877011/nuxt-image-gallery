import type { FilePlugin } from '../../types'
import { getImageList } from '../config/images'
import { useCosSignBatch } from '../composables/useCosSign'

export default defineNuxtPlugin(async () => {
  // 从配置文件读取图片列表（包含 COS key）
  const imageList = getImageList()
  const images = ref(imageList)

  // 在客户端批量获取签名链接
  if (typeof window !== 'undefined') {
    try {
      const signedImages = await useCosSignBatch(imageList)
      images.value = signedImages
    }
    catch (error) {
      console.error('Failed to load signed image URLs:', error)
      // 如果签名失败，保持原始列表（但 url 为 undefined）
    }
  }

  return {
    provide: {
      file: {
        images
      } as FilePlugin
    }
  }
})

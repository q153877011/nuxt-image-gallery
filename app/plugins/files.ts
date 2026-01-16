import type { FilePlugin } from '../../types'
import type { ImageItem } from '../config/images'

export default defineNuxtPlugin(() => {
  // 图片列表将在进入首页后从 KV 拉取并写入
  const images = ref<ImageItem[]>([])

  return {
    provide: {
      file: {
        images
      } as FilePlugin
    }
  }
})

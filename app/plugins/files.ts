import type { FilePlugin } from '../../types'
import { getImageList } from '../config/images'

export default defineNuxtPlugin(() => {
  // 从配置文件读取图片URL列表
  const images = ref(getImageList())

  return {
    provide: {
      file: {
        images
      } as FilePlugin
    }
  }
})

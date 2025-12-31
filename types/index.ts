import type { ImageItem } from '../app/config/images'

export interface FilePlugin {
  images: Ref<ImageItem[]>
}

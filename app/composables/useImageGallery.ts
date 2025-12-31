import type { UseSwipeDirection } from '@vueuse/core'
import type { FilePlugin } from '../../types'
import { encodeImageSlug, decodeImageSlug, isImageMatch } from '../utils/url.ts'

export function useImageGallery () {
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const route = useRoute()

  const file = nuxtApp.$file as FilePlugin

  const currentIndex: ComputedRef<number> = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value) {
      return -1
    }

    const imageId = String(route.params.slug[0])
    return file.images.value.findIndex((image) => String(image.id) === imageId)
  })

  const isFirstImg: ComputedRef<boolean> = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value || file.images.value.length === 0) {
      return false
    }

    const imageId = String(route.params.slug[0])
    return file.images.value[0] !== undefined
      ? isImageMatch(String(file.images.value[0].id), imageId)
      : false
  })

  const isLastImg: ComputedRef<boolean> = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value || file.images.value.length === 0) {
      return false
    }

    const imageId = String(route.params.slug[0])
    const lastImage = file.images.value[file.images.value.length - 1]
    return lastImage ? isImageMatch(String(lastImage.id), imageId) : false
  })

  const navigateToImage = (index: number) => {
    if (!file.images.value || index < 0 || index >= file.images.value.length || !file.images.value[index]) {
      return
    }

    const encodedSlug = encodeImageSlug(file.images.value[index]!.id)
    router.push(`/detail/${encodedSlug}`)
  }

  const initSwipe = (el: Ref<HTMLImageElement | undefined>) => {
    useSwipe(el, {
      passive: false,

      onSwipeEnd (e: TouchEvent, direction: UseSwipeDirection) {
        const current = currentIndex.value

        if (direction === 'left') {
          if (isLastImg.value) {
            router.push('/')
          }
          else {
            navigateToImage(current + 1)
          }
        }
        else {
          if (isFirstImg.value) {
            router.push('/')
          }
          else {
            navigateToImage(current - 1)
          }
        }
      }
    })
  }

  const applyFilters = async (poster: HTMLImageElement, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

    canvas.width = poster?.naturalWidth
    canvas.height = poster?.naturalHeight

    context!.filter = `contrast(${contrast}%) blur(${blur}px) invert(${invert}%)
      saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%)`

    context!.drawImage(poster!, 0, 0, canvas.width, canvas.height)

    const modifiedImage = new Image()
    modifiedImage.src = canvas.toDataURL('image/png')

    return ref(modifiedImage) as Ref<HTMLImageElement>
  }

  const downloadImage = async (imageUrl: string, poster: HTMLImageElement, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number) => {
    const modifiedImage = await applyFilters(poster, contrast, blur, invert, saturate, hueRotate, sepia)

    if (!modifiedImage.value) {
      return
    }

    const link: HTMLAnchorElement = document.createElement('a')
    link.setAttribute('href', modifiedImage.value.src)
    link.setAttribute('download', `image-${Date.now()}.png`)
    link.click()
  }

  const magnifierImage = (e: MouseEvent, containerEl: HTMLElement, imageEl: HTMLImageElement, magnifierEl: HTMLElement, zoomFactor: number = 2) => {
    // 只在客户端执行
    if (typeof window === 'undefined') return

    try {
      if (magnifierEl.style.filter !== imageEl.style.filter)
        magnifierEl.style.filter = imageEl.style.filter

      const imageRect = imageEl.getBoundingClientRect()
      const containerRect = containerEl.getBoundingClientRect()

      const x = e.pageX - containerRect.left
      const y = e.pageY - containerRect.top

      const imgWidth = imageRect.width
      const imgHeight = imageRect.height

      const zoomedWidth = imgWidth * (zoomFactor === 1 ? 1.5 : zoomFactor)
      const zoomedHeight = imgHeight * (zoomFactor === 1 ? 1.5 : zoomFactor)

      let xperc = (x / imgWidth) * 100
      let yperc = (y / imgHeight) * 100

      if (x > 0.01 * imgWidth)
        xperc += 0.15 * xperc

      if (y >= 0.01 * imgHeight)
        yperc += 0.15 * yperc

      magnifierEl.style.backgroundSize = `${zoomedWidth}px ${zoomedHeight}px`
      magnifierEl.style.backgroundPositionX = `${xperc - 9}%`
      magnifierEl.style.backgroundPositionY = `${yperc - 9}%`
      magnifierEl.style.left = `${x - 50}px`
      magnifierEl.style.top = `${y - 50}px`
      magnifierEl.style.zIndex = '9999'
    }
    catch (err) {
      // 忽略 SSR 中的错误
    }
  }

  return {
    downloadImage,
    applyFilters,
    magnifierImage,
    initSwipe,
    currentIndex,
    isFirstImg,
    isLastImg
  }
}

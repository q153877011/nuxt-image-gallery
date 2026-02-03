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

  const galleryQuery = computed(() => {
    const raw = route.query.user_id
    const userId = Array.isArray(raw) ? raw[0] : raw

    if (typeof userId === 'string' && userId.length > 0) {
      return { user_id: userId }
    }

    return undefined
  })

  const navigateToGallery = () => {
    router.push({ path: '/', query: galleryQuery.value })
  }

  const navigateToImage = (index: number) => {
    if (!file.images.value || index < 0 || index >= file.images.value.length || !file.images.value[index]) {
      return
    }

    const encodedSlug = encodeImageSlug(file.images.value[index]!.id)
    router.push({ path: `/detail/${encodedSlug}`, query: galleryQuery.value })
  }

  // 更丝滑的滑动：使用 Pointer Events + rAF 更新 transform，松手后再判断是否切换
  const initSwipe = (el: Ref<HTMLElement | undefined>) => {
    if (typeof window === 'undefined') {
      return () => {}
    }

    const target = el.value
    if (!target) {
      return () => {}
    }

    // 让浏览器把纵向滚动交给原生处理，横向由我们处理
    // （在微信内置浏览器里对“更跟手”有明显帮助）
    try {
      target.style.touchAction = 'pan-y'
      target.style.willChange = 'transform'
    }
    catch {
      // ignore
    }

    let startX = 0
    let startY = 0
    let deltaX = 0
    let deltaY = 0
    let dragging = false
    let pointerId: number | null = null
    let raf = 0

    const THRESHOLD_PX = 70
    const TAP_SLOP_PX = 8

    const applyTransform = (x: number) => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        target.style.transform = `translate3d(${x}px, 0, 0)`
      })
    }

    const resetTransform = () => {
      if (raf) {
        window.cancelAnimationFrame(raf)
        raf = 0
      }
      target.style.transition = 'transform 180ms ease-out'
      target.style.transform = 'translate3d(0px, 0, 0)'
    }

    const markSwiping = () => {
      // 给 click 做一个短暂抑制标记，避免“滑动松手触发点击返回”
      target.dataset.swiping = '1'
      window.setTimeout(() => {
        delete target.dataset.swiping
      }, 220)
    }

    const onPointerDown = (e: PointerEvent) => {
      // 只处理触控；鼠标拖拽交给浏览器
      if (e.pointerType === 'mouse') return

      dragging = true
      pointerId = e.pointerId
      startX = e.clientX
      startY = e.clientY
      deltaX = 0
      deltaY = 0

      target.style.transition = 'none'

      try {
        target.setPointerCapture(pointerId)
      }
      catch {
        // ignore
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || pointerId === null || e.pointerId !== pointerId) return

      deltaX = e.clientX - startX
      deltaY = e.clientY - startY

      // 主要是纵向滚动时，不抢事件
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }

      if (Math.abs(deltaX) > TAP_SLOP_PX) {
        markSwiping()
      }

      applyTransform(deltaX)
    }

    const onPointerEnd = () => {
      if (!dragging) return

      dragging = false

      if (pointerId !== null) {
        try {
          target.releasePointerCapture(pointerId)
        }
        catch {
          // ignore
        }
      }

      const x = deltaX

      const current = currentIndex.value
      if (Math.abs(x) < THRESHOLD_PX) {
        resetTransform()
        pointerId = null
        return
      }

      // 不要“弹回去等下一张加载”，而是直接滑出并马上切路由
      markSwiping()

      const w = (typeof window !== 'undefined' ? window.innerWidth : 0) || target.clientWidth || 400
      const flyOutX = x < 0 ? -w : w

      if (raf) {
        window.cancelAnimationFrame(raf)
        raf = 0
      }

      target.style.transition = 'transform 140ms ease-out'
      target.style.transform = `translate3d(${flyOutX}px, 0, 0)`

      window.setTimeout(() => {
        if (x < 0) {
          if (isLastImg.value) {
            navigateToGallery()
          }
          else {
            navigateToImage(current + 1)
          }
        }
        else {
          if (isFirstImg.value) {
            navigateToGallery()
          }
          else {
            navigateToImage(current - 1)
          }
        }
      }, 120)

      pointerId = null
    }

    const hasPointer = typeof window !== 'undefined' && 'PointerEvent' in window

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return

      dragging = true
      startX = e.touches[0]!.clientX
      startY = e.touches[0]!.clientY
      deltaX = 0
      deltaY = 0

      target.style.transition = 'none'
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || e.touches.length === 0) return

      deltaX = e.touches[0]!.clientX - startX
      deltaY = e.touches[0]!.clientY - startY

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }

      if (Math.abs(deltaX) > TAP_SLOP_PX) {
        markSwiping()
      }

      applyTransform(deltaX)
    }

    const onTouchEnd = () => {
      onPointerEnd()
    }

    if (hasPointer) {
      target.addEventListener('pointerdown', onPointerDown, { passive: true })
      target.addEventListener('pointermove', onPointerMove, { passive: true })
      target.addEventListener('pointerup', onPointerEnd, { passive: true })
      target.addEventListener('pointercancel', onPointerEnd, { passive: true })
    }
    else {
      target.addEventListener('touchstart', onTouchStart, { passive: true })
      target.addEventListener('touchmove', onTouchMove, { passive: true })
      target.addEventListener('touchend', onTouchEnd, { passive: true })
      target.addEventListener('touchcancel', onTouchEnd, { passive: true })
    }

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf)
      }

      if (hasPointer) {
        target.removeEventListener('pointerdown', onPointerDown)
        target.removeEventListener('pointermove', onPointerMove)
        target.removeEventListener('pointerup', onPointerEnd)
        target.removeEventListener('pointercancel', onPointerEnd)
      }
      else {
        target.removeEventListener('touchstart', onTouchStart)
        target.removeEventListener('touchmove', onTouchMove)
        target.removeEventListener('touchend', onTouchEnd)
        target.removeEventListener('touchcancel', onTouchEnd)
      }
    }
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

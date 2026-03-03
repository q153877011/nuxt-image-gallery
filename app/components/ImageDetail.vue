<script setup lang="ts">
import type { ImageItem } from '../config/images'
import { useCosSign } from '../composables/useCosSign'

const imageEl = ref<HTMLImageElement>()
const magnifierEl = ref<HTMLElement>()
const imageContainer = ref<HTMLElement>()
const swipeContainer = ref<HTMLElement>()

// filter
const filter = ref(false)
const contrast = ref(100)
const blur = ref(0)
const hueRotate = ref(0)
const invert = ref(0)
const saturate = ref(100)
const sepia = ref(0)
const magnifier = ref(false)
const zoomFactor = ref(1)
const objectsFit = ref(['Contain', 'Cover', 'Scale-down', 'Fill', 'None'])
const objectFitSelected = ref(objectsFit.value[0])
const filterUpdated = ref(false)

const { images } = useFile()

const { currentIndex, isFirstImg, isLastImg, initSwipe, magnifierImage } = useImageGallery()

const isClient = typeof window !== 'undefined'
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

const active = useState()
const route = useRoute()
const router = useRouter()

const galleryQuery = computed(() => {
  const raw = route.query.user_id
  const userId = Array.isArray(raw) ? raw[0] : raw

  if (typeof userId === 'string' && userId.length > 0) {
    return { user_id: userId }
  }

  return undefined
})

const galleryTo = computed(() => ({
  path: '/',
  query: galleryQuery.value
}))

const prevTo = computed(() => {
  const prev = images.value?.[currentIndex.value - 1]
  if (prev?.id) {
    return { path: `/detail/${prev.id}`, query: galleryQuery.value }
  }
  return galleryTo.value
})

const nextTo = computed(() => {
  const next = images.value?.[currentIndex.value + 1]
  if (next?.id) {
    return { path: `/detail/${next.id}`, query: galleryQuery.value }
  }
  return galleryTo.value
})

function recordGalleryReturn() {
  if (!isClient) {
    return
  }

  // 默认：定位到"退出时这张图"
  const slug = route.params.slug
  const currentId = Array.isArray(slug) && slug[0] ? String(slug[0]) : null
  if (!currentId) {
    return
  }

  // 移动端：更符合预期的是回到"进入详情时的位置"
  let returnId = currentId
  if (isMobile.value) {
    try {
      const entryId = sessionStorage.getItem('gallery_entry_id')
      if (entryId) {
        returnId = entryId
      }
    }
    catch {
      // ignore
    }
  }

  try {
    sessionStorage.setItem('gallery_return_id', returnId)
  }
  catch {
    // ignore storage errors
  }
}

function handleReturnToGallery() {
  // 移动端点击关闭：不要依赖 router.back()，它在某些情况下会丢失 query（导致首页清空图片）
  // 这里统一走 replace + 列表页根据 sessionStorage 恢复滚动位置
  recordGalleryReturn()
  router.replace(galleryTo.value)
}

const image: ComputedRef<ImageItem | null> = computed(() => {
  if (!route.params.slug || !route.params.slug[0]) {
    return null
  }

  if (!images.value || images.value.length === 0) {
    return null
  }

  // 根据 id 查找图片
  const imageId = String(route.params.slug[0])
  const foundImage = images.value.find((img: ImageItem) => String(img.id) === imageId)

  if (!foundImage) {
    console.warn(`Image not found for id: ${imageId}`)
    return null
  }

  return foundImage
})

// 确保图片有签名 URL
const imageUrl = ref<string | undefined>(undefined)
const imageLoaded = ref(false)

// 用于追踪 imageUrl 变更序列，防止异步检查 complete 时覆盖新的状态
let imageUrlSeq = 0

watch(imageUrl, async (newUrl) => {
  const seq = ++imageUrlSeq
  imageLoaded.value = false
  if (!isClient || !newUrl) return

  // 如果图片已经在缓存/预加载里，@load 可能会非常快触发甚至错过，
  // 这里用多帧重试检查 complete，避免出现"图片有了但一直 opacity-0"
  // 最多重试 8 帧 (~130ms)，覆盖 v-if 渲染 + 缓存图片同步 load 的场景
  for (let i = 0; i < 8; i++) {
    await nextTick()
    // 如果 imageUrl 又变了，放弃本次检查
    if (seq !== imageUrlSeq) return
    // 如果已经通过 @load 设置过了，就不用再检查
    if (imageLoaded.value) return

    if (imageEl.value && imageEl.value.complete && imageEl.value.naturalWidth > 0) {
      imageLoaded.value = true
      return
    }
  }

  // 兜底：如果 5 秒后仍在 loading（同一个 url），强制显示（避免永远卡在 loading）
  if (isClient) {
    window.setTimeout(() => {
      if (seq === imageUrlSeq && !imageLoaded.value) {
        imageLoaded.value = true
      }
    }, 5000)
  }
})

// 预加载（真正发起图片请求），避免滑动后才开始下载下一张
const preloadedImages = ref<Map<string, HTMLImageElement>>(new Map())

function schedulePrefetch(fn: () => void) {
  if (!isClient) return

  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
  if (ric) {
    ric(fn, { timeout: 600 })
  }
  else {
    window.setTimeout(fn, 0)
  }
}

function preloadImageUrl(url: string) {
  if (!isClient || !url) return
  if (preloadedImages.value.has(url)) return

  const img = new Image()
  img.decoding = 'async'
  ;(img as unknown as { loading?: string }).loading = 'eager'

  const cleanup = () => {
    preloadedImages.value.delete(url)
  }

  img.onload = cleanup
  img.onerror = cleanup

  // 赋值后立即开始请求
  img.src = url

  // 尝试提前解码，减少切换时首帧卡顿（不支持时忽略）
  img.decode?.().catch(() => {})

  preloadedImages.value.set(url, img)
}

let imageWatchToken = 0

watch(image, async (newImage: ImageItem | null) => {
  const token = ++imageWatchToken

  if (!newImage) {
    imageUrl.value = undefined
    return
  }

  // 路由切换后先立刻重置 transform，避免"弹回旧图等加载"
  if (isClient && swipeContainer.value) {
    swipeContainer.value.style.transition = 'none'
    swipeContainer.value.style.transform = 'translate3d(0px, 0, 0)'
  }

  if (newImage.url) {
    // 已有 url → 直接切换（imageLoaded 由 watch(imageUrl) 管理）
    // 如果和上一张 url 相同需要手动 触发 watch
    const prevUrl = imageUrl.value
    imageUrl.value = newImage.url
    // 如果 url 没变化 watch(imageUrl) 不会触发，手动重置
    if (prevUrl === newImage.url) {
      imageLoaded.value = false
      await nextTick()
      if (token !== imageWatchToken) return
      if (imageEl.value && imageEl.value.complete && imageEl.value.naturalWidth > 0) {
        imageLoaded.value = true
      }
    }
    // 主动预加载/解码，减少空白
    preloadImageUrl(newImage.url)
  }
  else if (newImage.key && isClient) {
    // 没有预签名时：显示 skeleton，同时异步拿签名
    imageUrl.value = undefined

    try {
      const signed = await useCosSign(newImage.key)
      if (token !== imageWatchToken) return

      imageUrl.value = signed

      // 拿到签名后立刻开始预加载当前图，减少首帧空窗
      preloadImageUrl(signed)

      // 更新 images 数组中的 URL
      const index = images.value?.findIndex((img: ImageItem) => img.id === newImage.id)
      if (index !== undefined && index >= 0 && images.value) {
        images.value[index] = {
          ...newImage,
          url: signed
        }
      }
    }
    catch (error) {
      console.error(`Failed to sign image ${newImage.key}:`, error)
    }
  }
  else {
    imageUrl.value = undefined
  }
}, { immediate: true })

async function prefetchImage(target?: ImageItem) {
  if (!target || !target.key || !isClient) return

  try {
    let url = target.url

    // 1) 先保证有签名 URL（有了 URL 才能真正预加载资源）
    if (!url) {
      url = await useCosSign(target.key)
      const index = images.value?.findIndex((img: ImageItem) => img.id === target.id)
      if (index !== undefined && index >= 0 && images.value) {
        images.value[index] = {
          ...images.value[index],
          url
        }
      }
    }

    // 2) 再真正预加载图片资源（发起请求）
    if (url) {
      schedulePrefetch(() => preloadImageUrl(url!))
    }
  }
  catch {
    // 静默失败，不影响滑动
  }
}

watch(currentIndex, (idx) => {
  if (!images.value || idx < 0) return

  // 预取更多一层，尽量保证滑动后能"秒切"不等签名
  const prev = images.value[idx - 1]
  const next = images.value[idx + 1]
  const prev2 = images.value[idx - 2]
  const next2 = images.value[idx + 2]

  prefetchImage(prev)
  prefetchImage(next)
  prefetchImage(prev2)
  prefetchImage(next2)
}, { immediate: true })

// 计算图片样式（避免 SSR 问题）
const imageStyle = computed(() => {
  if (!image.value) return {}
  const fit = (objectFitSelected.value ?? 'Contain').toLowerCase()
  return {
    filter: `contrast(${contrast.value}%) blur(${blur.value}px) invert(${invert.value}%) saturate(${saturate.value}%) hue-rotate(${hueRotate.value}deg) sepia(${sepia.value}%)`,
    objectFit: fit as 'contain' | 'cover' | 'scale-down' | 'fill' | 'none'
  }
})

// 计算放大镜样式
const magnifierStyle = computed(() => {
  if (!imageUrl.value) return {}
  return {
    backgroundImage: `url('${imageUrl.value}')`
  }
})

// 检查是否是当前图片（用于 view transition）
const isCurrentImage = computed(() => {
  if (!route.params.slug?.[0] || !image.value) return false
  return String(route.params.slug[0]) === String(image.value.id)
})

onKeyStroke('Escape', () => {
  handleReturnToGallery()
})

onKeyStroke('ArrowLeft', () => {
  if (isFirstImg.value) {
    handleReturnToGallery()
    return
  }

  const prev = images.value?.[currentIndex.value - 1]
  if (prev?.id) {
    router.push({ path: `/detail/${prev.id}`, query: galleryQuery.value })
  }
})

onKeyStroke('ArrowRight', () => {
  if (isLastImg.value) {
    handleReturnToGallery()
    return
  }

  const next = images.value?.[currentIndex.value + 1]
  if (next?.id) {
    router.push({ path: `/detail/${next.id}`, query: galleryQuery.value })
  }
})

function resetFilter() {
  contrast.value = 100
  blur.value = 0
  invert.value = 0
  saturate.value = 100
  hueRotate.value = 0
  sepia.value = 0
  filterUpdated.value = false
  magnifier.value = false
  zoomFactor.value = 1
}

watch([contrast, blur, invert, saturate, hueRotate, sepia], () => {
  filterUpdated.value = true
})

let stopSwipe: (() => void) | null = null

function handleImageTap() {
  // 如果刚刚发生过滑动（pointer handler 标记），不要触发"点图返回"
  if (swipeContainer.value?.dataset.swiping === '1') {
    return
  }
  handleReturnToGallery()
}

onMounted(() => {
  // 绑定滑动手势到外层容器（不会因路由切换被销毁重建）
  stopSwipe = initSwipe(swipeContainer as Ref<HTMLElement | undefined>)
})

onUnmounted(() => {
  stopSwipe?.()
  stopSwipe = null

  // 释放预加载引用（不强制中断请求，但避免长期占用内存）
  preloadedImages.value.clear()
})
</script>

<template>
  <div v-if="image" class="relative min-h-screen">
    <UContainer class="overflow-x-hidden relative flex items-center justify-center">
      <ImageFilters
        class="absolute md:mt-36 transition-transform duration-200"
        :class="filter ? 'translate-x-0 right-8 ' : 'translate-x-full right-0'"
        @reset-filter="resetFilter"
        @close-filter="filter = false"
      >
        <div
          class="flex flex-col gap-y-12 pb-6 h-[60dvh]"
          :class="filter ? 'block opacity-100' : 'hidden opacity-0'"
        >
          <div class="flex flex-col gap-y-4">
            <!-- filters list -->
            <div class="flex gap-x-4 justify-between items-center pb-4">
              <span class="text-white w-40">Fit</span>
              <USelectMenu
                v-model="objectFitSelected"
                :items="objectsFit"
                class="!w-52 mr-4"
              />
            </div>

            <div class="flex gap-x-4 w-full justify-end pr-4 pb-4">
              <UCheckbox
                v-model="magnifier"
                name="magnifier"
                label="Magnifier"
                color="gray"
                :ui="{ label: 'text-gray-300 dark:text-gray-300' }"
              />
              <UIcon
                name="i-heroicons-magnifying-glass-solid"
                class="w-5 h-5 text-gray-300"
              />
            </div>

            <UGauge
              v-if="magnifier"
              v-model="zoomFactor"
              :max="4"
              title="Zoom level"
            />
            <UGauge
              v-model="sepia"
              :max="100"
              title="Sepia"
            />
            <UGauge
              v-model="hueRotate"
              :max="180"
              title="Hue-rotate"
            />
            <UGauge
              v-model="saturate"
              :max="100"
              title="Saturate"
            />
            <UGauge
              v-model="invert"
              :max="100"
              title="Invert"
            />
            <UGauge
              v-model="contrast"
              :max="200"
              title="Contrast"
            />
            <UGauge
              v-model="blur"
              :max="5"
              title="Blur"
            />
          </div>
        </div>
      </ImageFilters>

      <div class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto">
        <div
          :class="{ '-translate-x-[100px]': filter }"
          class="transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative"
        >
          <div class="flex items-center justify-center md:justify-between gap-x-4 w-full">
            <!-- previous image if not the first image -->
            <UTooltip
              v-if="!isFirstImg"
              text="Previous"
              :shortcuts="['←']"
            >
                <UButton
                  variant="ghost"
                  color="gray"
                  :to="prevTo"
                  size="lg"
                  icon="i-heroicons-chevron-left"
                  class="hidden md:flex ml-4"
                  aria-label="Go to previous image"
                  @click="active = image.id"
                />

            </UTooltip>

            <div
              v-else
              class="flex group"
            >
              <!-- back to gallery if first movie -->
              <UTooltip
                text="Back"
                :shortcuts="['Esc']"
              >
                <UButton
                  :to="galleryTo"
                  size="xl"
                  color="gray"
                  variant="ghost"
                  class="back hidden md:flex ml-4 transition-colors duration-200"
                  aria-label="Back"
                  @click="() => { active = image.id; recordGalleryReturn() }"
                >
                  <UIcon
                    name="i-heroicons-rectangle-group-20-solid"
                    class="w-6 h-6"
                  />
                </UButton>
              </UTooltip>
            </div>

            <!-- image -->
            <div
              ref="swipeContainer"
              class="relative flex items-center justify-center xl:m-16"
            >
              <div ref="imageContainer">
                <div class="group">
                  <div
                    v-if="image"
                    class="relative w-full h-[60vh] flex items-center justify-center rounded overflow-hidden bg-transparent"
                  >
                    <div
                      v-if="!imageUrl || !imageLoaded"
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div
                        class="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/70 animate-spin"
                        aria-label="Loading"
                      />
                    </div>

                    <img
                      v-if="imageUrl"
                      ref="imageEl"
                      :src="imageUrl"
                      :alt="image.id"
                      class="rounded object-contain transition-[transform,filter,opacity] duration-200 block will-change-transform select-none touch-pan-y"
                      :class="[
                        { imageEl: isCurrentImage },
                        filter ? 'w-[80%] ml-[12px]' : 'w-full',
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      ]"
                      :style="imageStyle"
                      draggable="false"
                      @load="imageLoaded = true"
                      @error="imageLoaded = true"
                      @click="handleImageTap"
                      @mousemove="magnifier && imageContainer && imageEl && magnifierEl ? magnifierImage($event, imageContainer, imageEl, magnifierEl, zoomFactor) : () => {}"
                    >
                  </div>

                  <div
                    v-if="magnifier && imageUrl"
                    ref="magnifierEl"
                    class="w-[100px] h-[100px] absolute border border-gray-200 pointer-events-none rounded-full block opacity-0 group-hover:opacity-100 transition-opacity duration-200 "
                    :style="magnifierStyle"
                  />
                </div>
              </div>
            </div>

            <!-- next image (if not the last image) -->
            <UTooltip
              v-if="!isLastImg"
              text="Next"
              :shortcuts="['→']"
            >
                <UButton
                  variant="ghost"
                  color="gray"
                  :to="nextTo"
                  size="lg"
                  icon="i-heroicons-chevron-right"
                  class="hidden md:flex mr-4 rounded-full"
                  aria-label="Go to next image"
                  @click="active = image.id"
                />

            </UTooltip>

            <!-- back to gallery if last image -->
            <UTooltip
              v-else
              text="Back"
              :shortcuts="['Esc']"
            >
              <div class="flex">
                <UButton
                  variant="ghost"
                  color="gray"
                  :to="galleryTo"
                  size="xl"
                  class="back hidden md:flex mr-4 transition-colors duration-200"
                  aria-label="Back"
                  @click="() => { active = image.id; recordGalleryReturn() }"
                >
                  <UIcon
                    name="i-heroicons-rectangle-group-20-solid"
                    class="w-6 h-6"
                  />
                </UButton>
              </div>
            </UTooltip>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-black">
    <div class="text-center">
      <div v-if="!images || images.length === 0" class="space-y-4">
        <USkeleton class="h-12 w-12 bg-white-500 mx-auto" :ui="{ rounded: 'rounded-full' }" />
        <p class="text-white">加载中...</p>
      </div>
      <div v-else class="space-y-4">
        <p class="text-white text-xl">图片未找到</p>
        <UButton :to="galleryTo" color="primary" variant="outline">
          返回图库
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu {
    view-transition-name: vtn-bottom-menu;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
  }

  .back {
    view-transition-name: vtn-back-button;
  }
}
</style>

<style>
@keyframes slide-to-left {
  to {
    transform: translateX(0px);
  }
}

::view-transition-old(vtn-bottom-menu-description) {
  animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  width: auto;
  opacity: 0;
}
</style>

<script setup lang="ts">
import type { ImageItem } from '../config/images'
import { getCachedImageUrl } from '../composables/useImageCache'

const mansoryItem = ref<Array<HTMLElement>>([])
const { images } = useFile()
const active = useState()
const route = useRoute()

const imagesLoading = useState<boolean>('imagesLoading', () => false)
const imagesLoaded = useState<boolean>('imagesLoaded', () => false)

const viewedKeys = ref<Set<string>>(new Set())
const goodLoadingKeys = ref<Set<string>>(new Set())
const goodBumpKeys = ref<Set<string>>(new Set())

function getGoodText(image: ImageItem): string | null {
  const raw = image.good
  if (raw === null || raw === undefined) return null

  const text = typeof raw === 'number' ? String(raw) : raw
  if (!text || text === '0') return null
  return text
}

function bumpGood(key: string) {
  if (!key) return

  goodBumpKeys.value.add(key)
  window.setTimeout(() => {
    goodBumpKeys.value.delete(key)
  }, 180)
}

function setImageGood(key: string, good: string | number | null) {
  if (!images.value || images.value.length === 0) return

  const idx = images.value.findIndex(img => img.key === key)
  if (idx < 0) return

  images.value[idx] = {
    ...images.value[idx],
    good
  }
}

const userId = computed(() => {
  const raw = route.query.user_id
  const val = Array.isArray(raw) ? raw[0] : raw
  return typeof val === 'string' && val.length > 0 ? val : null
})

async function incrementGood(image: ImageItem) {
  if (typeof window === 'undefined') return
  if (!userId.value || !image.key) return
  if (goodLoadingKeys.value.has(image.key)) return

  bumpGood(image.key)

  goodLoadingKeys.value.add(image.key)
  try {
    const res = await $fetch<{ ok: boolean, good?: string | number | null }>('/api/images/good', {
      method: 'POST',
      body: {
        user_id: userId.value,
        key: image.key
      }
    })

    if (res && res.ok) {
      // 服务端会返回自增后的值（int8 可能是 string）
      if (res.good !== undefined) {
        setImageGood(image.key, res.good ?? null)
      }
      else {
        // 兜底：如果未返回，至少本地 +1（避免无反馈）
        const current = getGoodText(image)
        const next = current ? String((BigInt(current) + 1n)) : '1'
        setImageGood(image.key, next)
      }
    }
  }
  catch (err) {
    console.error('Failed to increment good:', err)
  }
  finally {
    goodLoadingKeys.value.delete(image.key)
  }
}

async function incrementViewIfNeeded(key: string) {
  if (!userId.value) return
  if (viewedKeys.value.has(key)) return

  viewedKeys.value.add(key)
  try {
    await $fetch('/api/images/view', {
      method: 'POST',
      body: {
        user_id: userId.value,
        key
      }
    })
  }
  catch (err) {
    // 静默失败：不影响浏览
    console.error('Failed to increment view_cnt:', err)
  }
}

const observer = ref<IntersectionObserver | null>(null)

function setupViewObserver() {
  if (typeof window === 'undefined') return

  observer.value?.disconnect()
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target as HTMLElement
      const key = el.dataset.imageKey
      if (key) {
        incrementViewIfNeeded(key)
      }
    })
  }, {
    threshold: 0.25
  })

  mansoryItem.value.forEach((el) => {
    observer.value?.observe(el)
  })
}

// 让类型检查工具知道这些变量在模板中会被使用（无副作用）
void mansoryItem.value
void imagesLoading.value
void imagesLoaded.value

// 缓存图片 URL 的 Map（存储 blob URL）
const cachedImageUrls = ref<Map<string, string>>(new Map())

// 为每个图片获取签名链接（如果还没有）
const signedImages = computed(() => {
  return images.value?.map((image: ImageItem) => {
    if (image.url) {
      return image
    }
    // 如果还没有签名 URL，返回一个占位符
    // 实际 URL 会在组件挂载后异步加载
    return {
      ...image,
      url: undefined
    }
  }) || []
})

// 获取缓存的图片 URL
async function getCachedUrl(imageUrl: string, imageId: string): Promise<string> {
  // 如果已经有缓存的 URL，直接返回
  if (cachedImageUrls.value.has(imageId)) {
    return cachedImageUrls.value.get(imageId)!
  }

  // 获取并缓存图片
  const cachedUrl = await getCachedImageUrl(imageUrl)
  cachedImageUrls.value.set(imageId, cachedUrl)
  return cachedUrl
}

// 为每个图片预加载并缓存（懒加载）
async function loadAndCacheImage(image: ImageItem) {
  if (!image.url || !image.id || cachedImageUrls.value.has(image.id)) {
    return
  }

  try {
    await getCachedUrl(image.url, image.id)
  }
  catch (error) {
    console.error(`Failed to cache image ${image.id}:`, error)
  }
}

// 监听图片列表变化，自动缓存有 URL 的图片
watch(signedImages, (newImages: ImageItem[]) => {
  if (typeof window === 'undefined') return

  // 为每个有 URL 的图片启动缓存（异步，不阻塞）
  newImages.forEach((image: ImageItem) => {
    if (image.url && image.id && !cachedImageUrls.value.has(image.id)) {
      loadAndCacheImage(image).catch(() => {
        // 静默失败，不影响显示
      })
    }
  })
}, { immediate: true })

// 加载中时展示的骨架数量
const skeletonItems = computed(() => Array.from({ length: 12 }, (_, i) => i))

function recordGalleryEntry(imageId: string) {
  if (typeof window === 'undefined') return
  if (!imageId) return

  try {
    sessionStorage.setItem('gallery_entry_id', String(imageId))
    sessionStorage.setItem('gallery_entry_scroll_y', String(window.scrollY || 0))
  }
  catch {
    // ignore storage errors
  }
}

function tryRestoreScrollPosition() {
  if (typeof window === 'undefined') return

  let targetId: string | null = null
  let targetScrollY: number | null = null

  try {
    targetId = sessionStorage.getItem('gallery_return_id')

    const rawY = sessionStorage.getItem('gallery_entry_scroll_y')
    if (rawY && !Number.isNaN(Number(rawY))) {
      targetScrollY = Number(rawY)
    }
  }
  catch {
    return
  }

  if (!targetId && targetScrollY === null) return

  const clearKeys = () => {
    try {
      sessionStorage.removeItem('gallery_return_id')
      sessionStorage.removeItem('gallery_entry_id')
      sessionStorage.removeItem('gallery_entry_scroll_y')
    }
    catch {
      // ignore
    }
  }

  // 在 Nuxt 的 scrollBehavior 之后再恢复，避免被“回到顶部”覆盖
  let attempts = 0
  const maxAttempts = 12

  const run = () => {
    // 1) 优先按 id 精确定位
    if (targetId) {
      const el = document.querySelector(`[data-image-id="${targetId}"]`) as HTMLElement | null
      if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'auto' })
        clearKeys()
        return
      }

      // 2) 降级：如果有进入时的 scrollY，就先恢复到大致位置
      if (targetScrollY !== null) {
        window.scrollTo({ top: targetScrollY, left: 0, behavior: 'auto' })
        clearKeys()
        return
      }

      // 3) 既没有元素也没有 scrollY，就重试几帧（等列表渲染出来）
      if (attempts++ < maxAttempts) {
        requestAnimationFrame(run)
      }
      else {
        clearKeys()
      }

      return
    }

    // 只有 scrollY 的情况
    if (targetScrollY !== null) {
      window.scrollTo({ top: targetScrollY, left: 0, behavior: 'auto' })
      clearKeys()
    }
  }

  requestAnimationFrame(() => requestAnimationFrame(run))
}

watch(signedImages, async (newImages) => {
  if (typeof window === 'undefined') return
  if (!newImages || newImages.length === 0) return

  await nextTick()
  tryRestoreScrollPosition()
  setupViewObserver()
}, { immediate: true })

onActivated(async () => {
  if (typeof window === 'undefined') return
  if (!signedImages.value || signedImages.value.length === 0) return

  await nextTick()
  tryRestoreScrollPosition()
  setupViewObserver()
})

onDeactivated(() => {
  observer.value?.disconnect()
})

// 组件卸载时清理 blob URL
onUnmounted(() => {
  observer.value?.disconnect()

  cachedImageUrls.value.forEach((blobUrl: string) => {
    if (blobUrl.startsWith('blob:')) {
      URL.revokeObjectURL(blobUrl)
    }
  })
  cachedImageUrls.value.clear()
})
</script>

<template>
  <div>
    <section
      v-if="images"
      class="relative min-h-screen gap-[22px] p-4"
    >
      <div
        class="w-full"
        :class="{ 'masonry-container': images && images.length }"
      >
        <ul
          v-if="signedImages && signedImages.length"
          class="grid grid-cols-1 gap-4 lg:block"
        >
          <li
            v-for="image in signedImages"
            ref="mansoryItem"
            :key="image.id"
            :data-image-id="image.id"
            :data-image-key="image.key"
            class="relative w-full group masonry-item"
          >
            <NuxtLink
              :to="{ path: `/detail/${image.id}`, query: userId ? { user_id: userId } : undefined }"
              @click="() => { recordGalleryEntry(String(image.id)); active = image.id }"
            >
              <div
                class="w-full min-h-[100px] h-auto md:h-auto max-h-[430px] rounded-lg overflow-hidden gallery-card"
              >
                <img
                  v-if="image && image.url"
                  width="527"
                  height="430"
                  :src="cachedImageUrls.get(image.id) || image.url"
                  :alt="`Image ${image.id}`"
                  loading="lazy"
                  :class="{ imageEl: image.id === active }"
                  class="w-full h-auto md:h-auto transition-all duration-300 ease-out border-image brightness-100 md:brightness-[.85] md:hover:brightness-105 md:hover:scale-[1.02] will-change-[filter,transform] object-contain md:object-cover"
                  @load="() => loadAndCacheImage(image)"
                >
                <div
                  v-else
                  class="h-full w-full bg-white/[0.03] flex items-center justify-center"
                >
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
                  </div>
                </div>
              </div>
            </NuxtLink>

            <button
              type="button"
              class="gallery-good-btn absolute bottom-3 right-3 z-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-2 hover:bg-black/60 hover:border-white/20 transition-all duration-200 flex items-center gap-1.5"
              :class="[
                goodLoadingKeys.has(image.key) ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 md:opacity-0',
                goodBumpKeys.has(image.key) ? 'scale-110' : 'scale-100',
                getGoodText(image) ? '!opacity-100' : ''
              ]"
              :disabled="goodLoadingKeys.has(image.key)"
              aria-label="Good"
              @click.stop.prevent="() => incrementGood(image)"
            >
              <img src="/good.svg" alt="good" class="w-4 h-4">
              <span
                v-if="getGoodText(image)"
                class="text-[11px] text-white/80 tabular-nums font-medium"
              >
                {{ getGoodText(image) }}
              </span>
            </button>
          </li>
        </ul>
        <div
          v-else
          class="text-2xl text-white flex flex-col gap-y-4 items-center justify-center h-full w-full pb-8"
        >
          <div v-if="imagesLoading" class="w-full">
            <ul class="grid grid-cols-1 gap-4 lg:block">
              <li
                v-for="item in skeletonItems"
                :key="item"
                class="relative w-full masonry-item"
              >
                <div class="min-h-[100px] h-auto md:h-auto max-h-[430px] w-full rounded-lg bg-white/[0.03] overflow-hidden skeleton-shimmer">
                  <USkeleton class="min-h-[100px] h-full w-full" />
                </div>
              </li>
            </ul>
          </div>

          <p v-else-if="imagesLoaded" class="text-white/40 text-base font-light tracking-wide">
            暂无图片
          </p>

          <div v-else class="w-full">
            <ul class="grid grid-cols-1 gap-4 lg:block">
              <li
                v-for="item in skeletonItems"
                :key="item"
                class="relative w-full masonry-item"
              >
                <div class="min-h-[100px] h-auto md:h-auto max-h-[430px] w-full rounded-lg bg-white/[0.03] overflow-hidden skeleton-shimmer">
                  <USkeleton class="min-h-[100px] h-full w-full" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <div class="w-10 h-10 rounded-full border border-white/10 border-t-white/40 animate-spin" />
        <p class="text-white/40 text-sm tracking-wide">加载中...</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
/* 画廊卡片渐入 */
.gallery-card {
  position: relative;
}

/* 点赞按钮移动端始终可见 */
@media (max-width: 767px) {
  .gallery-good-btn {
    opacity: 1 !important;
  }
}

/* 骨架屏微光 */
.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 100%
  );
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
  }

  .container-image {
    background-color: rgba(255, 255, 255, 0.05)
  }

  .container-image:hover {
    background-color: transparent;
  }

  .border-image {
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.06)
  }
}

@media screen and (min-width: 1024px) {
  .masonry-container {
    column-count: 3;
    column-gap: 20px;
    column-fill: balance;
    margin: 20px auto 0;
    padding: 2rem;
  }

  .masonry-item,
  .upload {
    display: inline-block;
    margin: 0 0 20px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    width: 100%;
  }
}
</style>

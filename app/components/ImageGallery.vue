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

function tryRestoreScrollPosition() {
  if (typeof window === 'undefined') return

  let targetId: string | null = null
  try {
    targetId = sessionStorage.getItem('gallery_return_id')
  }
  catch {
    return
  }

  if (!targetId) return

  const el = document.querySelector(`[data-image-id="${targetId}"]`) as HTMLElement | null
  if (el) {
    el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
    sessionStorage.removeItem('gallery_return_id')
    sessionStorage.removeItem('gallery_scroll_y')
  }
}

watch(signedImages, async () => {
  if (typeof window === 'undefined') return
  await nextTick()
  tryRestoreScrollPosition()
  setupViewObserver()
}, { immediate: true })

onActivated(async () => {
  if (typeof window === 'undefined') return
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
      class="relative h-screen gap-[22px] p-4"
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
              @click="active = image.id"
            >
              <div
                class="w-full h-[280px] md:h-auto max-h-[430px] rounded-md overflow-hidden"
              >
                <img
                  v-if="image && image.url"
                  width="527"
                  height="430"
                  :src="cachedImageUrls.get(image.id) || image.url"
                  :alt="`Image ${image.id}`"
                  loading="lazy"
                  :class="{ imageEl: image.id === active }"
                  class="h-full w-full md:h-auto transition-all duration-200 border-image brightness-100 md:brightness-[.8] md:hover:brightness-100 will-change-[filter] object-cover"
                  @load="() => loadAndCacheImage(image)"
                >
                <div
                  v-else
                  class="h-full w-full bg-gray-800 flex items-center justify-center"
                >
                  <USkeleton class="h-full w-full" />
                </div>
              </div>
            </NuxtLink>

            <button
              type="button"
              class="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 backdrop-blur px-2 py-2 hover:bg-black/70 transition flex items-center gap-1"
              :class="[
                goodLoadingKeys.has(image.key) ? 'opacity-70 cursor-not-allowed' : 'opacity-100',
                goodBumpKeys.has(image.key) ? 'scale-125' : 'scale-100',
                'transition-transform duration-150 ease-out'
              ]"
              :disabled="goodLoadingKeys.has(image.key)"
              aria-label="Good"
              @click.stop.prevent="() => incrementGood(image)"
            >
              <img src="/good.svg" alt="good" class="w-5 h-5">
              <span
                v-if="getGoodText(image)"
                class="text-xs text-white tabular-nums"
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
                <div class="h-[280px] md:h-auto max-h-[430px] w-full rounded-md bg-gray-800 overflow-hidden">
                  <USkeleton class="h-full w-full" />
                </div>
              </li>
            </ul>
          </div>

          <p v-else-if="imagesLoaded" class="text-gray-400">
            No images available
          </p>

          <div v-else class="w-full">
            <ul class="grid grid-cols-1 gap-4 lg:block">
              <li
                v-for="item in skeletonItems"
                :key="item"
                class="relative w-full masonry-item"
              >
                <div class="h-[280px] md:h-auto max-h-[430px] w-full rounded-md bg-gray-800 overflow-hidden">
                  <USkeleton class="h-full w-full" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div v-else class="flex items-center space-x-4 z-10">
      <USkeleton class="h-12 w-12 bg-white-500" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px] bg-white-500" />
        <USkeleton class="h-4 w-[200px] bg-white-500" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
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
    background-color: rgba(255, 255, 255, 0.1)
  }

  .container-image:hover {
    background-color: transparent;
  }

  .border-image {
    border-width: 1.15px;
    border-color: rgba(255, 255, 255, 0.1)
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

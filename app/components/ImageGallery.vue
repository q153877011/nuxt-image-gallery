<script setup lang="ts">
import type { ImageItem } from '../config/images'
import { getCachedImageUrl } from '../composables/useImageCache'

const mansoryItem = ref<Array<HTMLElement>>([])
const { images } = useFile()
const active = useState()

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

// 组件卸载时清理 blob URL
onUnmounted(() => {
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
            class="relative w-full group masonry-item"
          >
            <NuxtLink
              :to="`/detail/${image.id}`"
              @click="active = image.id"
            >
              <img
                v-if="image && image.url"
                width="527"
                height="430"
                :src="cachedImageUrls.get(image.id) || image.url"
                :alt="`Image ${image.id}`"
                loading="lazy"
                :class="{ imageEl: image.id === active }"
                class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"
                @load="() => loadAndCacheImage(image)"
              >
              <div
                v-else
                class="h-auto w-full max-h-[430px] rounded-md bg-gray-800 flex items-center justify-center"
              >
                <USkeleton class="h-full w-full" />
              </div>
            </NuxtLink>
          </li>
        </ul>
        <div v-else class="text-2xl text-white flex flex-col gap-y-4 items-center justify-center h-full w-full pb-8">
          <p class="text-gray-400">
            No images available
          </p>
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

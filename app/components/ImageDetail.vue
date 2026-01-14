<script setup lang="ts">
import type { ImageItem } from '../config/images'
import { useCosSign } from '../composables/useCosSign'

const imageEl = ref<HTMLImageElement>()
const magnifierEl = ref<HTMLElement>()
const imageContainer = ref<HTMLElement>()

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

const active = useState()
const route = useRoute()
const router = useRouter()

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

watch(image, async (newImage: ImageItem | null) => {
  if (newImage) {
    if (newImage.url) {
      imageUrl.value = newImage.url
    }
    else if (newImage.key && typeof window !== 'undefined') {
      try {
        imageUrl.value = await useCosSign(newImage.key)
        // 更新 images 数组中的 URL
        const index = images.value?.findIndex((img: ImageItem) => img.id === newImage.id)
        if (index !== undefined && index >= 0 && images.value) {
          images.value[index] = {
            ...newImage,
            url: imageUrl.value
          }
        }
      }
      catch (error) {
        console.error(`Failed to sign image ${newImage.key}:`, error)
      }
    }
  }
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
  router.push('/')
})

onKeyStroke('ArrowLeft', () => {
  if (isFirstImg.value)
    router.push('/')
  else {
    const prevImage = images.value[currentIndex.value - 1]
    if (prevImage) {
      router.push(`/detail/${prevImage.id}`)
    }
  }
})

onKeyStroke('ArrowRight', () => {
  if (isLastImg.value)
    router.push('/')
  else {
    const nextImage = images.value[currentIndex.value + 1]
    if (nextImage) {
      router.push(`/detail/${nextImage.id}`)
    }
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

onMounted(() => {
  initSwipe(imageEl)
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
                :to="(() => { const prev = images?.[currentIndex - 1]; return prev?.id ? `/detail/${prev.id}` : '/'; })()"
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
                text="Back to gallery"
                :shortcuts="['Esc']"
              >
                <UButton
                  to="/"
                  size="xl"
                  color="gray"
                  variant="ghost"
                  class="back hidden md:flex ml-4 transition-colors duration-200"
                  aria-label="Back to gallery"
                  @click="active = image.id"
                >
                  <UIcon
                    name="i-heroicons-rectangle-group-20-solid"
                    class="w-6 h-6"
                  />
                </UButton>
              </UTooltip>
            </div>

            <!-- image -->
            <div class="relative flex items-center justify-center xl:m-16">
              <div ref="imageContainer">
                <div class="group">
                  <img
                    v-if="image && imageUrl"
                    ref="imageEl"
                    :src="imageUrl"
                    :alt="image.id"
                    class="rounded object-contain transition-all duration-200 block"
                    :class="[{ imageEl: isCurrentImage }, filter ? 'w-[80%] ml-[12px]' : 'w-full']"
                    :style="imageStyle"
                    @mousemove="magnifier && imageContainer && imageEl && magnifierEl ? magnifierImage($event, imageContainer, imageEl, magnifierEl, zoomFactor) : () => {}"
                  >
                  <div
                    v-else-if="image"
                    class="w-full h-[60vh] flex items-center justify-center bg-gray-800 rounded"
                  >
                    <USkeleton class="h-full w-full" />
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
                :to="(() => { const next = images?.[currentIndex + 1]; return next?.id ? `/detail/${next.id}` : '/'; })()"
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
              text="Back to gallery"
              :shortcuts="['Esc']"
            >
              <div class="flex">
                <UButton
                  variant="ghost"
                  color="gray"
                  to="/"
                  size="xl"
                  class="back hidden md:flex mr-4 transition-colors duration-200"
                  aria-label="Back to gallery"
                  @click="active = image.id"
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
        <UButton to="/" color="primary" variant="outline">
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

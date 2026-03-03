<script setup lang="ts">
import type { ImageItem } from '../config/images'

const thumbnails = ref<HTMLUListElement>()
const x = ref<number>(0)

const router = useRouter()
const { images } = useFile()
const { width } = useWindowSize()

async function moveThumbnail(imageId: string) {
  // get width of current image
  const currentImage = images.value!.find((image: ImageItem) => String(image.id) === imageId)
  const index = images.value!.indexOf(currentImage!) as number
  const imgToMove = ref<HTMLElement | undefined>(thumbnails.value?.children[index] as HTMLElement | undefined)
  const imageWidth: number = imgToMove.value!.offsetWidth

  // calculate translate to do. (current translate + middle screen pos x - middle thumbnail to move pos x)
  x.value = (x.value + ((width.value / 2) - (imgToMove.value!.getBoundingClientRect().left + ((imageWidth / 2)))))
}

// move thumbnail on mounted (if not gallery page)
onMounted(async () => {
  await nextTick()

  const currentPath = router.currentRoute.value.fullPath
  const slug = router.currentRoute.value.params.slug

  if (currentPath !== '/' && currentPath !== '/gate' && slug && Array.isArray(slug) && slug[0]) {
    moveThumbnail(slug[0])
  }
})

// move thumbnail after route changes
router.afterEach(async (to, _) => {
  await nextTick()

  const currentPath = router.currentRoute.value.fullPath
  const slug = to.params.slug

  if (currentPath !== '/' && currentPath !== '/gate' && slug && Array.isArray(slug) && slug[0]) {
    moveThumbnail(slug[0])
  }
})
</script>

<template>
  <div class="thumbnail-bar bg-gradient-to-b from-black/60 via-black/30 to-transparent md:from-black/40 md:via-black/20 md:to-transparent backdrop-blur-sm top-0 h-[72px] absolute overflow-hidden w-screen z-[9999]">
    <ul
      v-if="images && images.length"
      ref="thumbnails"
      class="fixed top-2.5 left-0 right-0 mr-8 whitespace-nowrap overflow-x-scroll scrollbar-hide"
    >
      <ImageThumbnail
        v-for="(thumbnail, index) in images"
        :key="index"
        class="transform-gpu transition-all duration-500 ease-out mx-3"
        :thumbnail="thumbnail"
        :style="{ transform: `translateX(${x}px) translateZ(0)` }"
      />
    </ul>
  </div>
</template>

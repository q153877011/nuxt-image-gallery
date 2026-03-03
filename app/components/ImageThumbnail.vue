<script setup lang="ts">
import { encodeImageSlug, isImageMatch } from '../utils/url.ts'
import type { ImageItem } from '../config/images'
import { useCosSign } from '../composables/useCosSign'

const props = defineProps<{
  thumbnail: ImageItem
}>()

const route = useRoute()
const thumbnailUrl = ref<string | undefined>(props.thumbnail.url)

const detailTo = computed(() => {
  const raw = route.query.user_id
  const userId = Array.isArray(raw) ? raw[0] : raw

  return {
    path: `/detail/${encodeImageSlug(props.thumbnail.id)}`,
    query: typeof userId === 'string' && userId.length > 0 ? { user_id: userId } : undefined
  }
})

// 如果还没有签名 URL，获取它
if (typeof window !== 'undefined' && !thumbnailUrl.value && props.thumbnail.key) {
  useCosSign(props.thumbnail.key).then((url) => {
    thumbnailUrl.value = url
  }).catch((error) => {
    console.error(`Failed to sign thumbnail ${props.thumbnail.key}:`, error)
  })
}

function isCurrentImage(imageId: string) {
  const currentSlug = route.params.slug
  if (!currentSlug || !currentSlug[0]) return false

  return isImageMatch(imageId, String(currentSlug[0]))
}
</script>

<template>
  <li
    v-if="$router.currentRoute.value.params.slug"
    class="text-black inline-block relative"
    :class="{ 'z-50': isCurrentImage(thumbnail.id) }"
  >
    <NuxtLink :to="detailTo">
      <div
        class="relative rounded-md overflow-hidden transition-all duration-400 ease-out"
        :class="isCurrentImage(thumbnail.id) ? 'ring-2 ring-white/60 shadow-lg shadow-white/10 scale-105' : 'ring-1 ring-white/5 hover:ring-white/20'"
      >
        <img
          v-if="thumbnailUrl"
          width="83"
          height="51"
          :src="thumbnailUrl"
          :alt="thumbnail.id"
          class="object-cover transition-all duration-400 ease-out w-[83px] h-[51px]"
          :class="isCurrentImage(thumbnail.id) ? 'brightness-100' : 'opacity-60 brightness-50 hover:brightness-75 hover:opacity-90'"
        >
        <div
          v-else
          class="w-[83px] h-[51px] bg-white/5 rounded-md flex items-center justify-center"
        >
          <div class="w-4 h-4 rounded-full border border-white/10 border-t-white/40 animate-spin" />
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

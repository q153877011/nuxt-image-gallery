<script setup lang="ts">
import { encodeImageSlug, isImageMatch } from '../utils/url.ts'
import type { ImageItem } from '../config/images'

defineProps<{
  thumbnail: ImageItem
}>()

const route = useRoute()

function isCurrentImage (imageId: string) {
  const currentSlug = route.params.slug
  if (!currentSlug || !currentSlug[0]) return false

  return isImageMatch(imageId, String(currentSlug[0]))
}
</script>

<template>
  <li v-if="$router.currentRoute.value.params.slug" class="text-black inline-block relative"
    :class="{ 'z-50': isCurrentImage(thumbnail.id) }">
    <NuxtLink :to="`/detail/${encodeImageSlug(thumbnail.id)}`">
      <img v-if="thumbnail" width="83" height="51" :src="thumbnail.url" :alt="thumbnail.id"
        class="object-cover rounded-md transition-all duration-500 hover:brightness-100 w-[83px] h-[51px]"
        :class="isCurrentImage(thumbnail.id) ? 'active brightness-100' : 'opacity-75 brightness-50'">
    </NuxtLink>
  </li>
</template>
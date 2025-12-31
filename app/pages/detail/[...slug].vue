<script setup lang="ts">
import type { ImageItem } from '../../config/images'

const route = useRoute()
const { images } = useFile()

// Get the current image based on the slug (id)
const image = computed(() => {
  if (!images.value) return null
  const imageId = String(route.params.slug![0])
  return images.value.find((img: ImageItem) => String(img.id) === imageId)
})

// SEO Meta tags for individual images
watchEffect(() => {
  if (image.value && image.value.url) {
    const imageName = `Image ${image.value.id}`
    const imageUrl = image.value.url

    useSeoMeta({
      title: `${imageName} - Nuxt Image Gallery`,
      description: `View ${imageName} in high quality. Part of our curated image gallery collection.`,
      ogTitle: `${imageName} - Nuxt Image Gallery`,
      ogDescription: `View ${imageName} in high quality. Part of our curated image gallery collection.`,
      ogImage: imageUrl,
      ogImageAlt: imageName,
      twitterCard: 'summary_large_image',
      twitterImage: imageUrl,
      twitterImageAlt: imageName
    })
  }
})
</script>

<template>
  <div>
    <ImageDetail />
  </div>
</template>
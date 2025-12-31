<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'NuxtHub Image Gallery Starter'
const description = 'A Nuxt template to build your full-stack image gallery application on the edge.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogSiteName: 'NuxtHub image gallery template',
  ogImage: 'https://image-gallery.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp class="bg-black min-h-[100dvh] overflow-x-auto relative"
    :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' && $router.currentRoute.value.fullPath !== '/gate' }">
    <NuxtPage />
    <ImageThumbnailList
      v-if="$router.currentRoute.value.fullPath !== '/gate'"
      :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'" />
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-family-sans: 'Inter', sans-serif;
}
</style>
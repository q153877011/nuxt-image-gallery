<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const route = useRoute()
const { width } = useWindowSize()

const isMobile = computed(() => width.value < 768)
const isDetailRoute = computed(() => route.path.startsWith('/detail/'))

const showThumbnailList = computed(() => {
  if (route.path === '/gate') return false
  // 移动端详情页：纯看图模式，不显示顶部缩略图导航
  if (isMobile.value && isDetailRoute.value) return false
  return true
})
</script>

<template>
  <UApp
    class="bg-black min-h-[100dvh] overflow-x-auto relative"
    :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' && $router.currentRoute.value.fullPath !== '/gate' }"
  >
    <NuxtPage keepalive />

    <ImageThumbnailList
      v-if="showThumbnailList"
      :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'"
    />
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-family-sans: 'Inter', sans-serif;
}
</style>

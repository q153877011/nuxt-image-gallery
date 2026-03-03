<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap' }
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
  return true
})
</script>

<template>
  <UApp
    class="bg-black min-h-[100dvh] overflow-x-auto relative"
    :class="{ 'flex flex-col md:block': route.path !== '/' && route.path !== '/gate' }"
  >
    <NuxtPage keepalive />

    <ImageThumbnailList
      v-if="showThumbnailList"
      :class="route.path !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'"
    />
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-family-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
}

/* 全局滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 隐藏缩略图滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 全局选中色 */
::selection {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

/* 页面切换过渡 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

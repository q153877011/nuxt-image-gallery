<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const gateVerified = useCookie<string | null>('gate_verified', {
  httpOnly: false,
  sameSite: 'strict'
}) as unknown as { value: string | null }

const isSuperAdmin = computed(() => String(gateVerified.value) === 'true')
</script>

<template>
  <UApp
    class="bg-black min-h-[100dvh] overflow-x-auto relative"
    :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' && $router.currentRoute.value.fullPath !== '/gate' }"
  >
    <NuxtPage />

    <!-- 头部入口：仅通过 /gate 密码验证（superadmin）可见 -->
    <UButton
      v-if="isSuperAdmin && $router.currentRoute.value.fullPath !== '/gate'"
      to="/admin"
      size="sm"
      color="primary"
      variant="solid"
      class="fixed top-4 right-4 z-[10000]"
    >
      Admin
    </UButton>

    <ImageThumbnailList
      v-if="$router.currentRoute.value.fullPath !== '/gate'"
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
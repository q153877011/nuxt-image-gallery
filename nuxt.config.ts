export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-auth-utils'
  ],
  devtools: { enabled: false },
  colorMode: {
    classSuffix: '',
    preference: 'dark' // Default color
  },
  compatibilityDate: '2024-07-30',
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  experimental: {
    viewTransition: true
  },
  nitro: {
    watchOptions: {
      ignored: [
        '**'
      ]
    }
  },
  seo: {
    redirectToCanonicalSiteUrl: true
  },
  site: {
    url: 'https://image-gallery.nuxt.dev/',
    name: 'Nuxt Image Gallery',
    description: 'A beautiful, full-stack image gallery application built with Nuxt on the edge',
    defaultLocale: 'en',
    indexable: true,
    env: 'production',
    trailingSlash: false
  },
  ui: {
    theme: {
      colors: ['gray', 'red']
    }
  },
  vite: {
    server: {
      watch: {
        ignored: [
          '**'
        ]
      }
    }
  }
})

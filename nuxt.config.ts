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
  runtimeConfig: {
    tencentSecretId: process.env.TENCENT_SECRET_ID,
    tencentSecretKey: process.env.TENCENT_SECRET_KEY,
    cosBucket: process.env.COS_BUCKET,
    cosRegion: process.env.COS_REGION
  },
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
  site: {
    defaultLocale: 'en',
    indexable: true,
    env: 'production',
    trailingSlash: false
  },
  ui: {
    theme: {
      colors: ['gray', 'red']
    }
  }
})

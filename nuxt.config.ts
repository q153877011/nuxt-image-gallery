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
    cosRegion: process.env.COS_REGION,

    // Supabase (server-side)
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
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

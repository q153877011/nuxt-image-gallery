import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseServer: SupabaseClient | null = null

/**
 * 服务端 Supabase Client。
 *
 * - 优先使用 `SUPABASE_SERVICE_ROLE_KEY`（可绕过 RLS）
 * - 若未配置，则回退到 `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseServer) {
    return supabaseServer
  }

  const config = useRuntimeConfig()
  const url = config.supabaseUrl as string | undefined
  const serviceRoleKey = config.supabaseServiceRoleKey as string | undefined
  const anonKey = config.supabaseAnonKey as string | undefined

  if (!url) {
    throw createError({ statusCode: 500, statusMessage: 'SUPABASE_URL is not set' })
  }

  const key = serviceRoleKey || anonKey
  if (!key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY is not set'
    })
  }

  supabaseServer = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })

  return supabaseServer
}

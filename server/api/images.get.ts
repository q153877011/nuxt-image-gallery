import { getSupabaseServerClient } from '../utils/supabase'

type ImageRow = { url: string | null }

function toCosKey(value: string): string {
  // Supabase 里存的是完整 URL 时，取 pathname 作为 COS key
  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const url = new URL(value)
      return url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname
    }
    catch {
      return value
    }
  }

  return value
}

async function fetchPublishedImageUrlsByUserId(userId: string): Promise<ImageRow[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('images')
    .select('url')
    .eq('user_id', userId)
    .eq('publish', true)
    .order('id', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return (data || []) as ImageRow[]
}

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const userIdRaw = query.user_id

  const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw
  if (!userId || typeof userId !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'missing user_id' })
  }

  // images.user_id 是 bigint，这里限制只允许数字，避免奇怪输入
  if (!/^\d+$/.test(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid user_id' })
  }

  const data = await fetchPublishedImageUrlsByUserId(userId)

  const keys = (data || [])
    .map(row => row.url)
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .map(toCosKey)

  return { keys }
})

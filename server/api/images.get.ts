import COS from 'cos-nodejs-sdk-v5'
import { getSupabaseServerClient } from '../utils/supabase'

type ImageRow = { url: string | null, good: string | number | null }

type PreSignedItem = {
  key: string
  url: string
  expires: number
}

const PRE_SIGN_LIMIT = 12
const SIGN_EXPIRES = 3600

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

function getCosClient() {
  const config = useRuntimeConfig()
  if (!config.tencentSecretId || !config.tencentSecretKey || !config.cosBucket || !config.cosRegion) {
    throw createError({
      statusCode: 500,
      statusMessage: 'COS configuration is missing. Please set TENCENT_SECRET_ID, TENCENT_SECRET_KEY, COS_BUCKET, and COS_REGION environment variables.'
    })
  }

  return {
    cos: new COS({
      SecretId: config.tencentSecretId,
      SecretKey: config.tencentSecretKey
    }),
    bucket: config.cosBucket,
    region: config.cosRegion
  }
}

function signCosKey(key: string): PreSignedItem {
  const { cos, bucket, region } = getCosClient()

  const url = cos.getObjectUrl({
    Bucket: bucket,
    Region: region,
    Key: key,
    Sign: true,
    Expires: SIGN_EXPIRES
  })

  return { key, url, expires: SIGN_EXPIRES }
}

async function fetchPublishedImageUrlsByUserId(userId: string): Promise<ImageRow[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('images')
    .select('url, good')
    .eq('user_id', userId)
    .eq('publish', true)
    // locked 允许为 false 或 null，过滤掉 locked = true 的图片
    .or('locked.is.null,locked.eq.false')
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

  const rows = (data || []) as ImageRow[]

  const keys = rows
    .map(row => row.url)
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .map(toCosKey)

  const goodByKey: Record<string, string | null> = {}
  rows.forEach((row) => {
    if (!row.url) return
    const key = toCosKey(row.url)
    const good = row.good

    if (good === null || good === undefined) {
      goodByKey[key] = null
      return
    }

    if (typeof good === 'number') {
      goodByKey[key] = String(good)
      return
    }

    if (typeof good === 'string') {
      goodByKey[key] = good
    }
  })

  const preSigned: PreSignedItem[] = []
  for (const key of keys.slice(0, PRE_SIGN_LIMIT)) {
    preSigned.push(signCosKey(key))
  }

  // 缓存提示：签名有效期内可缓存
  setHeader(event, 'Cache-Control', `private, max-age=${SIGN_EXPIRES - 60}`)

  return { keys, goodByKey, preSigned, preSignLimit: PRE_SIGN_LIMIT }
})

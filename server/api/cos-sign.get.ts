import COS from 'cos-nodejs-sdk-v5'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // 验证必要的配置
  if (!config.tencentSecretId || !config.tencentSecretKey || !config.cosBucket || !config.cosRegion) {
    throw createError({
      statusCode: 500,
      statusMessage: 'COS configuration is missing. Please set TENCENT_SECRET_ID, TENCENT_SECRET_KEY, COS_BUCKET, and COS_REGION environment variables.'
    })
  }

  const key = getQuery(event).key as string // 例如 images/a.jpg 或 wedding-photos/qwy-zlx/9.1931702.jpg
  if (!key) {
    throw createError({ statusCode: 400, statusMessage: 'missing key' })
  }

  // 安全限制：可以在这里添加路径白名单验证
  // 例如只允许特定前缀的 key
  // if (!key.startsWith('images/') && !key.startsWith('wedding-photos/')) {
  //   throw createError({ statusCode: 403, statusMessage: 'Invalid key path' })
  // }

  try {
  const cos = new COS({
    SecretId: config.tencentSecretId,
    SecretKey: config.tencentSecretKey
  })

    // 设置过期时间为 1 小时（3600 秒），可以根据需要调整
    const expires = 3600

  const url = cos.getObjectUrl({
    Bucket: config.cosBucket,
    Region: config.cosRegion,
    Key: key,
    Sign: true,
    Expires: expires
  })

    // 设置缓存头，允许客户端缓存
    setHeader(event, 'Cache-Control', `public, max-age=${expires - 60}`) // 提前 60 秒过期

  return { url, expires }
  }
  catch (error) {
    console.error('COS sign error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate signed URL'
    })
  }
})

import COS from 'cos-nodejs-sdk-v5'
import sharp from 'sharp'
import { randomBytes } from 'crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // 验证必要的配置
  if (!config.tencentSecretId || !config.tencentSecretKey || !config.cosBucket || !config.cosRegion) {
    throw createError({
      statusCode: 500,
      statusMessage: 'COS configuration is missing. Please set TENCENT environment variables.'
    })
  }

  try {
    // 读取上传的文件
    const formData = await readMultipartFormData(event)

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = formData[0]
    if (!file.data || !file.filename) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file data'
      })
    }

    // 验证文件类型
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
    if (!file.type || !allowedMimeTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type. Only images are allowed.'
      })
    }

    // 验证文件大小（限制为 20MB）
    const maxSize = 20 * 1024 * 1024 // 20MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File size exceeds 20MB limit'
      })
    }

    // 使用 sharp 转换为 webp
    let webpBuffer: Buffer
    try {
      webpBuffer = await sharp(file.data)
        .webp({ quality: 80 }) // 设置 webp 质量，85 是平衡质量和文件大小的好选择
        .toBuffer()
    }
    catch (error) {
      console.error('Sharp conversion error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to convert image to webp'
      })
    }

    // 获取文件夹名称（从 formData 中获取，如果没有则使用默认值 'images'）
    let folderName = 'images' // 默认文件夹名称
    const folderField = formData.find(field => field.name === 'folder')
    if (folderField && folderField.data) {
      const folder = folderField.data.toString('utf-8').trim()
      // 验证文件夹名称：只允许字母、数字、连字符、下划线和斜杠，防止路径注入
      if (folder && /^[a-zA-Z0-9_\-/]+$/.test(folder)) {
        // 移除开头和结尾的斜杠，并清理多余的斜杠
        folderName = folder.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/')
      }
    }

    // 生成唯一的文件名
    const originalName = file.filename.replace(/\.[^/.]+$/, '') // 移除扩展名
    const timestamp = Date.now()
    const randomStr = randomBytes(4).toString('hex')
    const webpKey = `${folderName}/${originalName}-${timestamp}-${randomStr}.webp`

    // 上传到 COS
    const cos = new COS({
      SecretId: config.tencentSecretId,
      SecretKey: config.tencentSecretKey
    })

    interface PutObjectResult {
      Location: string
      Key: string
    }

    const uploadResult = await new Promise<PutObjectResult>((resolve, reject) => {
      cos.putObject({
        Bucket: config.cosBucket,
        Region: config.cosRegion,
        Key: webpKey,
        Body: webpBuffer,
        ContentType: 'image/webp'
      }, (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          const result = data as unknown as PutObjectResult
          resolve({
            Location: result.Location || '',
            Key: result.Key || webpKey
          })
        }
      })
    })

    // 返回上传结果
    return {
      success: true,
      key: uploadResult.Key,
      url: `https://${config.cosBucket}.cos.${config.cosRegion}.myqcloud.com/${uploadResult.Key}`,
      message: 'Image uploaded and converted to webp successfully'
    }
  }
  catch (error: unknown) {
    console.error('Upload error:', error)

    // 如果是我们创建的错误，直接抛出
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // 否则返回通用错误
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})

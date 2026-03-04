import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'])

export default eventHandler(() => {
  // 仅开发模式可用
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const testDir = join(process.cwd(), 'public', 'test')

  let files: string[]
  try {
    files = readdirSync(testDir)
  }
  catch {
    return { images: [] }
  }

  const images = files
    .filter((f) => {
      const ext = f.slice(f.lastIndexOf('.')).toLowerCase()
      return SUPPORTED_EXTS.has(ext)
    })
    .sort((a, b) => {
      // 尝试数字排序
      const na = parseInt(a)
      const nb = parseInt(b)
      if (!isNaN(na) && !isNaN(nb)) return na - nb
      return a.localeCompare(b)
    })
    .map((f, index) => ({
      id: String(index),
      key: `test/${f}`,
      url: `/test/${f}`
    }))

  return { images }
})

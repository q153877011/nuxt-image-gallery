<script setup lang="ts">
import { buildImageList } from '../config/images'
import { useCosSignBatch } from '../composables/useCosSign'
import type { ImageItem } from '../config/images'

definePageMeta({
  keepalive: true
})

type PreSignedItem = {
  key: string
  url: string
  expires: number
}

const { images } = useFile()
const toast = useToast()

const imagesLoading = useState<boolean>('imagesLoading', () => false)
const imagesLoaded = useState<boolean>('imagesLoaded', () => false)
const lastLoadedUserId = useState<string | null>('lastLoadedUserId', () => null)

const route = useRoute()

function getUserIdFromRoute(): string | null {
  const raw = route.query.user_id
  const val = Array.isArray(raw) ? raw[0] : raw
  if (typeof val === 'string' && val.length > 0) {
    return val
  }
  return null
}

function getErrorMessage(err: unknown): string {
  // $fetch 的错误通常会带 data.message
  if (typeof err === 'object' && err) {
    const maybeData = (err as Record<string, unknown>).data
    if (typeof maybeData === 'object' && maybeData) {
      const msg = (maybeData as Record<string, unknown>).message
      if (typeof msg === 'string' && msg.length > 0) {
        return msg
      }
    }
  }

  return err instanceof Error ? err.message : '请稍后重试'
}

function mergePreSigned(list: ImageItem[], preSigned?: PreSignedItem[]): ImageItem[] {
  if (!preSigned || preSigned.length === 0) return list
  const map = new Map(preSigned.map(item => [item.key, item.url]))

  return list.map((img) => {
    const url = map.get(img.key)
    return url ? { ...img, url } : img
  })
}

async function signMissingImages(list: ImageItem[]) {
  const missing = list.filter(img => !img.url)
  if (missing.length === 0) return

  const signedMissing = await useCosSignBatch(missing)
  const signedMap = new Map(signedMissing.map(img => [img.key, img]))

  images.value = list.map((img) => signedMap.get(img.key) || img)
}

async function loadImagesForUser(userId: string) {
  imagesLoading.value = true
  imagesLoaded.value = false
  images.value = []

  try {
    const res = await $fetch<{ keys: string[], goodByKey?: Record<string, string | null>, preSigned?: PreSignedItem[] }>('/api/images', {
      method: 'GET',
      params: { user_id: userId }
    })

    const list = buildImageList(res.keys || []).map((img) => {
      const good = res.goodByKey?.[img.key] ?? null
      return { ...img, good }
    })
    const initialList = mergePreSigned(list, res.preSigned)

    // 先渲染首屏签名（服务端预签名）
    images.value = initialList
    lastLoadedUserId.value = userId
    imagesLoaded.value = true
    imagesLoading.value = false

    // 后台补签剩余图片（不阻塞首屏显示）
    signMissingImages(initialList).catch(() => {
      // 静默失败，不影响首屏
    })
  }
  catch (err: unknown) {
    console.error('Failed to load images from Supabase:', err)

    toast.add({
      title: '图片加载失败',
      description: getErrorMessage(err),
      color: 'red'
    })

    imagesLoaded.value = true
    imagesLoading.value = false
  }
}

const isIndexRoute = computed(() => route.path === '/')

// 客户端进入首页后，根据 user_id 拉取
if (typeof window !== 'undefined') {
  watch(
    () => ({ isIndex: isIndexRoute.value, userId: getUserIdFromRoute() }),
    ({ isIndex, userId }) => {
      // 开启 keep-alive 后，index 页面在跳转到详情时会被缓存但仍然存活。
      // 这里必须只在首页路由激活时才执行加载/清空逻辑，避免在详情页丢失 query 时误清空图片列表。
      if (!isIndex) {
        return
      }

      if (userId) {
        if (lastLoadedUserId.value === userId && images.value && images.value.length > 0) {
          return
        }
        loadImagesForUser(userId)
      }
      else {
        images.value = []
        lastLoadedUserId.value = null
        imagesLoaded.value = true
        imagesLoading.value = false
      }
    },
    { immediate: true }
  )
}
</script>

<template>
  <main>
    <ImageGallery />
  </main>
</template>

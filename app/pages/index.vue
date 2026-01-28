<script setup lang="ts">
import { buildImageList } from '../config/images'
import { useCosSignBatch } from '../composables/useCosSign'

const { images } = useFile()
const toast = useToast()

const imagesLoading = useState<boolean>('imagesLoading', () => false)
const imagesLoaded = useState<boolean>('imagesLoaded', () => false)

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

async function loadImagesForUser(userId: string) {
  imagesLoading.value = true
  imagesLoaded.value = false
  images.value = []

  try {
    const res = await $fetch<{ keys: string[] }>('/api/images', {
      method: 'GET',
      params: { user_id: userId }
    })

    const list = buildImageList(res.keys || [])

    // 首页需要展示，所以批量签名一次
    const signed = await useCosSignBatch(list)
    images.value = signed
  }
  catch (err: unknown) {
    console.error('Failed to load images from Supabase:', err)

    toast.add({
      title: '图片加载失败',
      description: getErrorMessage(err),
      color: 'red'
    })
  }
  finally {
    imagesLoaded.value = true
    imagesLoading.value = false
  }
}

// 客户端进入首页后，根据 user_id 拉取
if (typeof window !== 'undefined') {
  watch(
    () => getUserIdFromRoute(),
    (userId) => {
      if (userId) {
        loadImagesForUser(userId)
      }
      else {
        images.value = []
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

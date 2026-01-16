<script setup lang="ts">
import { buildImageList } from '../config/images'
import { useCosSignBatch } from '../composables/useCosSign'

const { images } = useFile()
const toast = useToast()

const imagesLoading = useState<boolean>('imagesLoading', () => false)
const imagesLoaded = useState<boolean>('imagesLoaded', () => false)

const gateVerified = useCookie<string | null>('gate_verified', { httpOnly: false }) as unknown as { value: string | null }
const tokenVerified = useCookie<string | null>('gate_token_verified', { httpOnly: false }) as unknown as { value: string | null }

async function loadImagesFromKV() {
  // 已有数据就不重复拉取
  if (images.value && images.value.length > 0) {
    imagesLoaded.value = true
    imagesLoading.value = false
    return
  }

  // 未通过验证不读取
  const authed = String(gateVerified.value) === 'true' || String(tokenVerified.value) === 'true'
  if (!authed) {
    imagesLoaded.value = false
    imagesLoading.value = false
    return
  }

  imagesLoading.value = true

  try {
    const res = await $fetch<{ keys: string[] }>('/api/images', { method: 'GET' })
    const list = buildImageList(res.keys || [])

    // 首页需要展示，所以批量签名一次
    const signed = await useCosSignBatch(list)
    images.value = signed
    imagesLoaded.value = true
  }
  catch (err: any) {
    console.error('Failed to load images from KV:', err)
    imagesLoaded.value = true
    toast.add({
      title: '图片加载失败',
      description: err?.data?.message || err?.message || '请稍后重试',
      color: 'red'
    })
  }
  finally {
    imagesLoading.value = false
  }
}

// 进入首页（客户端）立即开始拉取，这样不会先闪现“无图片”
if (typeof window !== 'undefined') {
  loadImagesFromKV()
}
</script>

<template>
  <main>
    <ImageGallery />
  </main>
</template>

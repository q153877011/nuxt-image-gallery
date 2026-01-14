<script setup lang="ts">
const loading = ref(false)
const error = ref('')
const generatedLink = ref('')
const token = ref('')

const toast = useToast()

async function generateLink() {
  if (loading.value) return

  loading.value = true
  error.value = ''
  generatedLink.value = ''
  token.value = ''

  try {
    const result = await $fetch<{
      success: boolean
      token: string
      accessLink: string
      expiresIn: string
    }>('/api/gate/generate-link', {
      method: 'POST'
    } as any)

    if (result.success) {
      generatedLink.value = result.accessLink
      token.value = result.token
      toast.add({
        title: '链接生成成功',
        description: '链接已生成，24小时内有效',
        color: 'primary'
      })
    }
  }
  catch (err: any) {
    error.value = err.data?.message || err.message || '生成链接失败'
    toast.add({
      title: '生成失败',
      description: error.value,
      color: 'red'
    })
  }
  finally {
    loading.value = false
  }
}

function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      toast.add({
        title: '已复制',
        description: '链接已复制到剪贴板',
        color: 'primary'
      })
    }).catch(() => {
      toast.add({
        title: '复制失败',
        description: '请手动复制链接',
        color: 'red'
      })
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-black p-4">
    <div class="w-full max-w-2xl">
      <div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">
            生成访问链接
          </h1>
          <p class="text-gray-300 text-sm">
            生成一次性访问链接，24小时内有效
          </p>
        </div>

        <div class="space-y-6">
          <UButton
            type="button"
            :loading="loading"
            size="xl"
            color="primary"
            block
            class="w-full"
            @click="generateLink"
          >
            {{ generatedLink ? '重新生成链接' : '生成访问链接' }}
          </UButton>

          <div v-if="error" class="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-400 text-sm">
              {{ error }}
            </p>
          </div>

          <div v-if="generatedLink" class="space-y-4">
            <div class="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p class="text-green-400 text-sm mb-2">
                ✅ 链接已生成，24小时内有效
              </p>
            </div>

            <div>
              <label class="block text-gray-300 text-sm mb-2">
                访问链接：
              </label>
              <div class="flex gap-2">
                <UInput
                  :model-value="generatedLink"
                  readonly
                  size="lg"
                  class="flex-1"
                />
                <UButton
                  color="primary"
                  variant="outline"
                  icon="i-heroicons-clipboard-document"
                  @click="copyToClipboard(generatedLink)"
                >
                  复制
                </UButton>
              </div>
            </div>

            <div>
              <label class="block text-gray-300 text-sm mb-2">
                Token：
              </label>
              <div class="flex gap-2">
                <UInput
                  :model-value="token"
                  readonly
                  size="lg"
                  class="flex-1 font-mono text-xs"
                />
                <UButton
                  color="primary"
                  variant="outline"
                  icon="i-heroicons-clipboard-document"
                  @click="copyToClipboard(token)"
                >
                  复制
                </UButton>
              </div>
            </div>

            <div class="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <p class="text-blue-300 text-sm">
                <strong>使用说明：</strong>
              </p>
              <ul class="text-blue-300/80 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>通过此链接访问的用户无需输入密码</li>
                <li>链接在24小时后自动失效</li>
                <li>通过链接访问的用户无法访问此管理页面</li>
                <li>可以生成多个链接，每个链接独立有效</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


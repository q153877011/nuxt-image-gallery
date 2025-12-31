<script setup lang="ts">
const password = ref('')
const loading = ref(false)
const error = ref('')

const toast = useToast()

async function verifyPassword() {
  if (loading.value || !password.value) return

  loading.value = true
  error.value = ''

  try {
    const result = await $fetch<{ verified: boolean }>('/api/gate/verify', {
      method: 'POST',
      body: { password: password.value }
    } as any)

    if (result.verified) {
      toast.add({
        title: '验证成功',
        description: '正在跳转...',
        color: 'primary'
      })

      // 等待一小段时间确保 cookie 已设置并同步
      await new Promise(resolve => setTimeout(resolve, 200))

      // 验证成功后跳转到首页
      // 使用 window.location 强制刷新，确保中间件能读取到新的 cookie
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      } else {
        await navigateTo('/', { replace: true })
      }
    }
  }
  catch (err: any) {
    error.value = err.data?.message || err.message || '验证失败，请重试'
    toast.add({
      title: '验证失败',
      description: error.value,
      color: 'red'
    })
  }
  finally {
    loading.value = false
  }
}

// 自动聚焦输入框
onMounted(() => {
  const input = document.querySelector('input[type="password"]') as HTMLInputElement
  input?.focus()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div class="w-full max-w-md p-8">
      <div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">
            访问验证
          </h1>
          <p class="text-gray-300 text-sm">
            请输入密码以继续访问
          </p>
        </div>

        <form @submit.prevent="verifyPassword" class="space-y-6">
          <div>
            <UInput
              v-model="password"
              type="password"
              placeholder="请输入密码"
              size="xl"
              class="text-center"
              :class="{ 'border-red-500': error }"
              autocomplete="off"
              @input="error = ''"
            />
            <p v-if="error" class="mt-2 text-sm text-red-400">
              {{ error }}
            </p>
          </div>

          <UButton
            type="submit"
            :loading="loading"
            :disabled="!password"
            size="xl"
            color="primary"
            block
            class="w-full"
          >
            验证
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>


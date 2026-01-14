<script setup lang="ts">
interface UploadedImage {
  key: string
  url: string
}

interface FileItem {
  file: File
  preview: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress: number
  result?: UploadedImage
  error?: string
}

const fileInput = ref<HTMLInputElement>()
const selectedFiles = ref<FileItem[]>([])
const folderName = ref('images') // 默认文件夹名称
const uploading = ref(false)
const currentUploadIndex = ref(-1)
const error = ref('')
const uploadedImages = ref<UploadedImage[]>([])

const toast = useToast()

// 文件选择处理
async function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return

  error.value = ''
  const newFiles: FileItem[] = []

  // 验证每个文件
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
  const maxSize = 20 * 1024 * 1024 // 20MB

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file) continue

    // 验证文件类型
    if (!allowedTypes.includes(file.type)) {
      toast.add({
        title: '文件类型错误',
        description: `${file.name} 不支持的文件类型`,
        color: 'red'
      })
      continue
    }

    // 验证文件大小
    if (file.size > maxSize) {
      toast.add({
        title: '文件过大',
        description: `${file.name} 超过 20MB 限制`,
        color: 'red'
      })
      continue
    }

    // 创建预览
    const preview = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })

    newFiles.push({
      file,
      preview,
      status: 'pending' as const,
      progress: 0
    })
  }

  selectedFiles.value = [...selectedFiles.value, ...newFiles]
}

// 上传单个文件
async function uploadSingleFile(fileItem: FileItem, index: number): Promise<void> {
  fileItem.status = 'uploading'
  fileItem.progress = 0
  currentUploadIndex.value = index

  try {
    const formData = new FormData()
    formData.append('file', fileItem.file)
    // 添加文件夹名称
    if (folderName.value && folderName.value.trim()) {
      formData.append('folder', folderName.value.trim())
    }

    // 使用原生 fetch 以支持上传进度
    const xhr = new XMLHttpRequest()

    const result = await new Promise<{
      success: boolean
      key: string
      url: string
      message: string
    }>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          fileItem.progress = Math.round((e.loaded / e.total) * 100)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
          }
          catch {
            reject(new Error('Failed to parse response'))
          }
        }
        else {
          try {
            const error = JSON.parse(xhr.responseText)
            reject(new Error(error.message || 'Upload failed'))
          }
          catch {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error'))
      })

      xhr.open('POST', '/api/upload')
      xhr.send(formData)
    })

    if (result.success) {
      fileItem.status = 'success'
      fileItem.progress = 100
      fileItem.result = {
        key: result.key,
        url: result.url
      }
      uploadedImages.value.push(fileItem.result)
    }
  }
  catch (err: unknown) {
    fileItem.status = 'error'
    fileItem.error = err instanceof Error ? err.message : '上传失败'
    toast.add({
      title: '上传失败',
      description: `${fileItem.file.name}: ${fileItem.error}`,
      color: 'red'
    })
  }
}

// 依次上传所有文件
async function uploadAllFiles() {
  if (selectedFiles.value.length === 0) {
    error.value = '请先选择文件'
    return
  }

  uploading.value = true
  error.value = ''
  uploadedImages.value = []

  // 只上传待上传的文件
  const pendingFiles = selectedFiles.value.filter((f: FileItem) => f.status === 'pending')

  for (let i = 0; i < pendingFiles.length; i++) {
    const fileItem = pendingFiles[i]
    if (!fileItem) continue
    const index = selectedFiles.value.indexOf(fileItem)
    if (index >= 0) {
      await uploadSingleFile(fileItem, index)
    }
  }

  uploading.value = false
  currentUploadIndex.value = -1

  // 统计结果
  const successCount = selectedFiles.value.filter((f: FileItem) => f.status === 'success').length
  const errorCount = selectedFiles.value.filter((f: FileItem) => f.status === 'error').length

  if (successCount > 0) {
    toast.add({
      title: '上传完成',
      description: `成功: ${successCount}，失败: ${errorCount}`,
      color: successCount === selectedFiles.value.length ? 'primary' : 'red'
    })
  }
}

// 复制链接
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

// 移除文件
function removeFile(index: number) {
  selectedFiles.value.splice(index, 1)
}

// 清除所有文件
function clearAllFiles() {
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  selectedFiles.value = []
  uploadedImages.value = []
  error.value = ''
}

// 重置表单
function resetForm() {
  clearAllFiles()
}

// 生成所有成功上传文件的 key 数组字符串
const uploadedKeysArray = computed(() => {
  if (uploadedImages.value.length === 0) return ''
  const keys = uploadedImages.value.map((img: UploadedImage) => `'${img.key}'`)
  return `[\n${keys.join(',\n')}\n]`
})
</script>

<template>
  <div class="min-h-screen bg-black p-4">
    <UContainer class="max-w-4xl">
      <div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">
            上传图片
          </h1>
          <p class="text-gray-300 text-sm">
            支持 JPEG、PNG、GIF、WebP、BMP 格式，自动转换为 WebP 格式
          </p>
        </div>

        <!-- 上传表单 -->
        <div class="space-y-6">
          <!-- 文件夹名称 -->
          <div>
            <label class="block text-gray-300 text-sm mb-2">
              文件夹名称（可选，默认为 images）：
            </label>
            <UInput
              v-model="folderName"
              placeholder="images"
              size="lg"
              class="w-full"
            />
            <p class="text-gray-400 text-xs mt-1">
              例如：images、wedding-photos/qwy-zlx、gallery/2024（仅允许字母、数字、连字符、下划线和斜杠）
            </p>
          </div>

          <!-- 文件选择 -->
          <div>
            <label class="block text-gray-300 text-sm mb-2">
              选择图片文件（最大 20MB，可多选）：
            </label>
            <div class="flex gap-4">
              <UInput
                ref="fileInput"
                type="file"
                accept="image/*"
                multiple
                class="flex-1"
                @change="handleFileSelect"
              />
              <UButton
                v-if="selectedFiles.length > 0"
                color="gray"
                variant="ghost"
                @click="clearAllFiles"
              >
                清除全部
              </UButton>
            </div>
            <p class="text-gray-400 text-xs mt-1">
              已选择 {{ selectedFiles.length }} 个文件
            </p>
          </div>

          <!-- 文件列表预览 -->
          <div v-if="selectedFiles.length > 0" class="space-y-4">
            <label class="block text-gray-300 text-sm mb-2">
              文件列表：
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(fileItem, index) in selectedFiles"
                :key="index"
                class="relative p-4 bg-white/5 rounded-lg border border-white/10"
                :class="{
                  'border-green-500/50': fileItem.status === 'success',
                  'border-red-500/50': fileItem.status === 'error',
                  'border-blue-500/50': fileItem.status === 'uploading'
                }"
              >
                <!-- 文件信息 -->
                <div class="flex gap-3">
                  <img
                    :src="fileItem.preview"
                    :alt="fileItem.file.name"
                    class="w-20 h-20 object-cover rounded"
                  >
                  <div class="flex-1 min-w-0">
                    <p class="text-white text-sm font-medium truncate">
                      {{ fileItem.file.name }}
                    </p>
                    <p class="text-gray-400 text-xs mt-1">
                      {{ (fileItem.file.size / 1024 / 1024).toFixed(2) }} MB
                    </p>
                    <!-- 状态 -->
                    <div class="mt-2">
                      <span
                        v-if="fileItem.status === 'pending'"
                        class="text-xs text-gray-400"
                      >
                        等待上传
                      </span>
                      <span
                        v-else-if="fileItem.status === 'uploading'"
                        class="text-xs text-blue-400"
                      >
                        上传中... {{ fileItem.progress }}%
                      </span>
                      <span
                        v-else-if="fileItem.status === 'success'"
                        class="text-xs text-green-400"
                      >
                        ✅ 上传成功
                      </span>
                      <span
                        v-else-if="fileItem.status === 'error'"
                        class="text-xs text-red-400"
                      >
                        ❌ {{ fileItem.error }}
                      </span>
                    </div>
                    <!-- 进度条 -->
                    <div v-if="fileItem.status === 'uploading'" class="mt-2">
                      <UProgress :value="fileItem.progress" :max="100" size="xs" />
                    </div>
                  </div>
                  <!-- 删除按钮 -->
                  <UButton
                    v-if="fileItem.status !== 'uploading'"
                    color="red"
                    variant="ghost"
                    size="xs"
                    icon="i-heroicons-trash"
                    @click="removeFile(index)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 错误信息 -->
          <div v-if="error" class="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-400 text-sm">
              {{ error }}
            </p>
          </div>

          <!-- 上传按钮 -->
          <UButton
            type="button"
            :loading="uploading"
            :disabled="selectedFiles.length === 0 || uploading"
            size="xl"
            color="primary"
            block
            class="w-full"
            @click="uploadAllFiles"
          >
            {{ uploading ? `上传中... (${currentUploadIndex + 1}/${selectedFiles.length})` : `上传 ${selectedFiles.length} 个文件并转换为 WebP` }}
          </UButton>
        </div>

        <!-- 上传结果 -->
        <div v-if="uploadedImages.length > 0" class="space-y-6 mt-6">
          <div class="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p class="text-green-400 text-lg font-semibold mb-2">
              ✅ 上传完成！
            </p>
            <p class="text-green-300 text-sm">
              成功上传 {{ uploadedImages.length }} 个文件，已转换为 WebP 格式并上传到 COS
            </p>
          </div>

          <div class="space-y-4">
            <label class="block text-gray-300 text-sm mb-2">
              上传成功的文件：
            </label>
            <div class="space-y-3">
              <div
                v-for="(image, index) in uploadedImages"
                :key="index"
                class="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div class="flex gap-4">
                  <img
                    :src="image.url"
                    alt="Uploaded image"
                    class="w-24 h-24 object-cover rounded"
                  >
                  <div class="flex-1 space-y-2">
                    <div>
                      <label class="block text-gray-300 text-xs mb-1">
                        COS Key：
                      </label>
                      <div class="flex gap-2">
                        <UInput
                          :model-value="image.key"
                          readonly
                          size="sm"
                          class="flex-1 font-mono text-xs"
                        />
                        <UButton
                          color="primary"
                          variant="outline"
                          size="xs"
                          icon="i-heroicons-clipboard-document"
                          @click="copyToClipboard(image.key)"
                        >
                          复制
                        </UButton>
                      </div>
                    </div>
                    <div>
                      <label class="block text-gray-300 text-xs mb-1">
                        URL：
                      </label>
                      <div class="flex gap-2">
                        <UInput
                          :model-value="image.url"
                          readonly
                          size="sm"
                          class="flex-1 font-mono text-xs"
                        />
                        <UButton
                          color="primary"
                          variant="outline"
                          size="xs"
                          icon="i-heroicons-clipboard-document"
                          @click="copyToClipboard(image.url)"
                        >
                          复制
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 所有上传成功的 key 数组 -->
          <div v-if="uploadedImages.length > 0" class="space-y-2">
            <label class="block text-gray-300 text-sm mb-2">
              所有上传成功的 COS Key 数组：
            </label>
            <div class="relative">
              <textarea
                :value="uploadedKeysArray"
                readonly
                class="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                :rows="Math.min(uploadedImages.length + 2, 10)"
              />
              <UButton
                color="primary"
                variant="outline"
                size="sm"
                icon="i-heroicons-clipboard-document"
                class="absolute top-2 right-2"
                @click="copyToClipboard(uploadedKeysArray)"
              >
                复制数组
              </UButton>
            </div>
            <p class="text-gray-400 text-xs">
              共 {{ uploadedImages.length }} 个文件
            </p>
          </div>

          <UButton
            type="button"
            color="primary"
            variant="outline"
            block
            @click="resetForm"
          >
            继续上传
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>

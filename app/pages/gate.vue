<script setup lang="ts">
</script>

<template>
  <div class="gate-page min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.015] rounded-full blur-[120px]" />
      <div class="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/[0.01] rounded-full blur-[100px]" />
    </div>

    <div class="w-full max-w-sm p-6 relative z-10">
      <div class="bg-white/[0.06] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl shadow-black/50">
        <div class="text-center space-y-4">
          <!-- 锁图标 -->
          <div class="w-14 h-14 mx-auto rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-6">
            <UIcon name="i-heroicons-lock-closed" class="w-6 h-6 text-white/40" />
          </div>

          <h1 class="text-2xl font-semibold text-white/90 tracking-tight">
            无法直接访问
          </h1>
          <p class="text-white/40 text-sm leading-relaxed">
            请联系管理员获取<strong class="text-white/60">有效访问链接</strong>后再打开
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gate-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 60%);
  pointer-events: none;
}
</style>

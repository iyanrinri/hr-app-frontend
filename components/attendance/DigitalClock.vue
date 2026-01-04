<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref<Date | null>(null)
let timer: NodeJS.Timeout | null = null

onMounted(() => {
  // Initialize on mount to avoid hydration mismatch
  time.value = new Date()
  timer = setInterval(() => {
    time.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="font-mono text-3xl md:text-4xl font-bold tracking-wider text-brand-navy">
    <span v-if="time">{{ time.toLocaleTimeString('en-US', { hour12: false }) }}</span>
    <span v-else>--:--:--</span>
  </div>
</template>

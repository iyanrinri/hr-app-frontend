<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'

defineProps<{
  icon: LucideIcon
  label: string
  value?: string | number | null
}>()
</script>

<template>
  <div class="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
    <div class="flex-shrink-0 mr-3">
      <component :is="icon" class="w-5 h-5 text-gray-400" />
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{ label }}</p>
      <p class="mt-1 text-sm font-medium text-gray-900 break-words">{{ value || '-' }}</p>
    </div>
  </div>
</template>

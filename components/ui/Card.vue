<script setup lang="ts">
import { cn } from "@/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('bg-white rounded-lg shadow-sm border border-gray-200', props.class)">
    <slot />
  </div>
</template>

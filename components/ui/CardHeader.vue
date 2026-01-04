<script setup lang="ts">
import { cn } from "@/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('px-6 py-4 border-b border-gray-200', props.class)">
    <slot />
  </div>
</template>

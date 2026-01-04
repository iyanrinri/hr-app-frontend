<script setup lang="ts">
import { cn } from "@/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="cn('text-lg font-medium text-gray-900', props.class)">
    <slot />
  </h3>
</template>

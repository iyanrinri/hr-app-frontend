<script setup lang="ts">
import { cn } from "@/utils"

interface Props {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  fallback: ''
})

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base'
}

const getInitials = (name?: string) => {
  if (!name) return props.fallback || '?'
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <div :class="cn(
    'relative flex shrink-0 overflow-hidden rounded-full bg-gray-100 items-center justify-center font-medium text-gray-600',
    sizeClasses[size],
    props.class
  )">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt" 
      class="aspect-square h-full w-full object-cover"
      @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
    />
    <span v-else>{{ getInitials(alt) }}</span>
  </div>
</template>

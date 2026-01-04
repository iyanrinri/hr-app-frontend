<script setup lang="ts">
import { User } from 'lucide-vue-next'
import { cn } from '@/utils'

const props = withDefaults(defineProps<{
  name: string;
  position: string;
  isCurrent?: boolean;
  isManager?: boolean;
  isSubordinate?: boolean;
}>(), {
  isCurrent: false,
  isManager: false,
  isSubordinate: false
})
</script>

<template>
    <div :class="cn(
      'flex flex-col items-center p-3 rounded-lg border shadow-sm min-w-[150px] bg-white transition-all hover:shadow-md',
      isCurrent ? 'border-brand-navy ring-2 ring-brand-navy/20 bg-brand-navy/5' : 'border-gray-200',
      isManager ? 'border-purple-200 bg-purple-50' : '',
      isSubordinate ? 'border-green-200 bg-green-50' : ''
    )">
      <div :class="cn(
        'w-10 h-10 rounded-full flex items-center justify-center mb-2',
        isCurrent ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500',
        isManager ? 'bg-purple-100 text-purple-600' : '',
        isSubordinate ? 'bg-green-100 text-green-600' : ''
      )">
        <User class="w-5 h-5" />
      </div>
      <p class="font-semibold text-sm text-gray-900 text-center">{{ name }}</p>
      <p class="text-xs text-gray-500 text-center">{{ position }}</p>
    </div>
</template>

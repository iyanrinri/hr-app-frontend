<script setup lang="ts">
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-vue-next'
import { useToast, type Toast } from '@/composables/useToast'

const props = defineProps<{
  toast: Toast
}>()

const { remove } = useToast()

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle
}

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
}

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500'
}
</script>

<template>
  <div 
    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component 
            :is="icons[props.toast.type || 'info']" 
            class="h-6 w-6" 
            :class="iconColors[props.toast.type || 'info']" 
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p v-if="props.toast.title" class="text-sm font-medium text-gray-900">
            {{ props.toast.title }}
          </p>
          <p class="text-sm text-gray-500" :class="{ 'mt-1': props.toast.title }">
            {{ props.toast.message }}
          </p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button 
            type="button" 
            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
            @click="remove(props.toast.id)"
          >
            <span class="sr-only">Close</span>
            <X class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

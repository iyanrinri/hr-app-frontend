<script setup lang="ts">
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-vue-next'
import { cn } from "@/utils"

interface Props {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = {
  default: 'bg-blue-50 text-blue-900 border-blue-200',
  destructive: 'bg-red-50 text-red-900 border-red-200',
  success: 'bg-green-50 text-green-900 border-green-200',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200'
}

const iconComponent = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertCircle
}
</script>

<template>
  <div :class="cn(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    variantClasses[variant],
    props.class
  )">
    <component :is="iconComponent[variant]" class="h-4 w-4" />
    <h5 v-if="title" class="mb-1 font-medium leading-none tracking-tight">
      {{ title }}
    </h5>
    <div class="text-sm [&_p]:leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/utils"

interface Props {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const variants = {
  default: "bg-brand-navy text-white hover:bg-brand-navy/80",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200/80",
  destructive: "bg-red-100 text-red-700 hover:bg-red-200/80",
  outline: "text-gray-900 border border-gray-200 hover:bg-gray-100",
  success: "bg-green-100 text-green-700 hover:bg-green-200/80",
  warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200/80",
};
</script>

<template>
  <div :class="cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transiton-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    variants[variant],
    props.class
  )">
    <slot />
  </div>
</template>

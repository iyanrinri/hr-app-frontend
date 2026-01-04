<script setup lang="ts">
// import { Loader2 } from "lucide-vue-next"; // Global now
import { cn } from "@/utils";

interface Props {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  isLoading: false,
  disabled: false,
  type: "button",
  to: undefined,
});

const variants = {
  primary: "bg-brand-navy text-white hover:bg-opacity-90 focus:ring-brand-cyan",
  secondary:
    "bg-white text-brand-navy border border-gray-300 hover:bg-brand-light focus:ring-brand-navy",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost:
    "bg-transparent text-brand-navy hover:bg-brand-light focus:ring-brand-navy",
  outline:
    "bg-transparent text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white focus:ring-brand-cyan",
};
</script>

<template>
  <button
    v-if="!to"
    :type="type"
    :disabled="disabled || isLoading"
    :class="cn(
      'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
      variants[variant],
      $attrs.class as string
    )"
  >
    <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
    <slot />
  </button>

  <NuxtLink
    v-else
    :to="to"
    :class="cn(
      'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
      variants[variant],
      $attrs.class as string
    )"
  >
    <slot />
  </NuxtLink>
</template>

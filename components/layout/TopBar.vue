<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
    <h1 class="text-lg font-semibold text-gray-800">
      Welcome back, {{ authStore.user?.name || 'User' }}
    </h1>
    <div class="flex items-center space-x-4">
      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
        {{ (authStore.user?.name?.charAt(0) || 'U').toUpperCase() }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'
import { onMounted, onUnmounted } from 'vue'
import { useWebSocket } from '@/composables/useWebSocket'
import { useAuthStore } from '@/stores/auth'

const { connect, disconnect } = useWebSocket()
const authStore = useAuthStore()

// Profile Sync Logic
// Since we don't have a specific Hook yet, we can do a simple check
// Ideally this should be a middleware or plugin
onMounted(async () => {
    connect()
    
    // Simple profile sync
    await authStore.fetchProfile()
})

onUnmounted(() => {
    disconnect()
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar />
      <main class="flex-1 p-6 overflow-auto bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

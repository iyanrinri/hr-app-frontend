<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bell, BellOff } from 'lucide-vue-next'

const permission = ref<NotificationPermission>('default')

onMounted(() => {
  if ('Notification' in window) {
    permission.value = Notification.permission
  }
})

const requestPermission = async () => {
  if ('Notification' in window) {
    const result = await Notification.requestPermission()
    permission.value = result
    
    if (result === 'granted') {
       new Notification('Notifications Enabled! 🎉', {
          body: 'You will now receive attendance updates',
          icon: '/favicon.ico',
        })
    }
  }
}
</script>

<template>
  <div v-if="permission === 'granted'" class="flex items-center gap-2 text-sm text-green-600">
    <Bell class="w-4 h-4" />
    <span>Notifications enabled</span>
  </div>

  <div v-else-if="permission === 'denied'" class="flex items-center gap-2 text-sm text-red-600">
    <BellOff class="w-4 h-4" />
    <span>Notifications blocked</span>
  </div>

  <UiButton v-else @click="requestPermission" variant="secondary" class="text-sm">
    <Bell class="w-4 h-4 mr-2" />
    Enable Notifications
  </UiButton>
</template>

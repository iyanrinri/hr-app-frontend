<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AttendanceHistory from '@/components/attendance/AttendanceHistory.vue'

const route = useRoute()
const authStore = useAuthStore()

const tenantSlug = route.params.tenant_slug as string
const isAdmin = computed(() => ['ADMIN', 'HR', 'SUPER'].includes(authStore.user?.role || ''))

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Attendance History</h2>
      <NuxtLink :to="`/${tenantSlug}/dashboard/attendance`">
        <UiButton variant="secondary">Back to Attendance</UiButton>
      </NuxtLink>
    </div>

    <AttendanceHistory :isAdmin="isAdmin" />
  </div>
</template>

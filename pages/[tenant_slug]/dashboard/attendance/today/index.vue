<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Calendar,
  RefreshCw 
} from 'lucide-vue-next'
import { useTodayAttendanceDashboard } from '@/composables/useAttendance'
import { useNotificationStore } from '@/stores/notifications'
import NotificationPermissionButton from '@/components/notifications/NotificationPermissionButton.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string
const notificationStore = useNotificationStore()

const { data: dashboard, loading, refresh } = useTodayAttendanceDashboard()

// Auto-refresh when dashboard update trigger changes (from WebSocket)
watch(() => notificationStore.dashboardUpdateTrigger, (newVal) => {
    if (newVal > 0) {
        console.log('🔄 [AUTO-REFRESH] Dashboard refreshing due to dashboard-update event')
        refresh()
    }
})

// Also refresh on notifications?
watch(() => notificationStore.notifications, (newVal) => {
    if (newVal.length > 0) {
        // Debounce?
        refresh()
    }
}, { deep: true })

const formatTime = (dateObj: string | number | Date | null | undefined) => {
    if (!dateObj) return '-'
    try {
      const date = new Date(dateObj)
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      })
    } catch {
      return '-'
    }
}

const getStatusBadge = (status: string | undefined) => {
    const badges: Record<string, string> = {
      PRESENT: 'bg-green-100 text-green-800',
      LATE: 'bg-yellow-100 text-yellow-800',
      ABSENT: 'bg-red-100 text-red-800',
      EXCUSED: 'bg-blue-100 text-blue-800',
    }
    return badges[status || ''] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
}
</script>

<template>
    <div class="space-y-6">
      <div v-if="loading && !dashboard" class="flex flex-col items-center justify-center py-12">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
         <p class="text-gray-600">Loading today's attendance...</p>
      </div>

      <div v-else-if="!dashboard" class="text-center py-12 text-gray-500">
        No attendance data available for today
      </div>

      <div v-else class="space-y-6">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Today's Attendance Dashboard</h2>
              <div class="flex items-center gap-4 mt-2">
                <div class="flex items-center text-sm text-gray-600">
                  <Calendar class="w-4 h-4 mr-2" />
                  {{ formatDate(dashboard.date) }}
                </div>
                <div class="flex items-center text-sm">
                  <div class="w-2 h-2 rounded-full mr-2" :class="notificationStore.isConnected ? 'bg-green-500' : 'bg-red-500'"></div>
                  {{ notificationStore.isConnected ? 'Live Updates Active' : 'Disconnected' }}
                </div>
                <NotificationPermissionButton />
              </div>
            </div>
            <div class="flex gap-2">
              <UiButton @click="refresh" variant="secondary">
                <RefreshCw class="w-4 h-4 mr-2" />
                Refresh
              </UiButton>
              <NuxtLink :to="tenantSlug ? `/${tenantSlug}/dashboard/attendance/history` : '/dashboard/attendance/history'">
                 <UiButton variant="secondary">View History</UiButton>
              </NuxtLink>
            </div>
          </div>

          <!-- Summary Stats -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <UiCard>
              <UiCardContent class="pt-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Total Employees</p>
                    <p class="text-3xl font-bold text-gray-900">{{ dashboard.summary.totalEmployees }}</p>
                  </div>
                  <Users class="w-10 h-10 text-gray-400" />
                </div>
              </UiCardContent>
            </UiCard>

            <UiCard>
              <UiCardContent class="pt-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Present</p>
                    <p class="text-3xl font-bold text-green-600">{{ dashboard.summary.totalPresent }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ dashboard.summary.attendanceRate.toFixed(0) }}% rate</p>
                  </div>
                  <UserCheck class="w-10 h-10 text-green-400" />
                </div>
              </UiCardContent>
            </UiCard>

            <UiCard>
              <UiCardContent class="pt-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Absent</p>
                    <p class="text-3xl font-bold text-red-600">{{ dashboard.summary.totalAbsent }}</p>
                  </div>
                  <UserX class="w-10 h-10 text-red-400" />
                </div>
              </UiCardContent>
            </UiCard>

            <UiCard>
              <UiCardContent class="pt-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Late</p>
                    <p class="text-3xl font-bold text-yellow-600">{{ dashboard.summary.totalLate }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ dashboard.summary.lateRate.toFixed(0) }}% rate</p>
                  </div>
                  <Clock class="w-10 h-10 text-yellow-400" />
                </div>
              </UiCardContent>
            </UiCard>
          </div>

          <!-- Period Info -->
           <UiCard>
            <UiCardContent class="pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Attendance Period</p>
                  <p class="text-lg font-bold text-gray-900">{{ dashboard.attendancePeriod.name }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600">Working Hours</p>
                  <p class="text-lg font-bold text-gray-900">
                    {{ dashboard.attendancePeriod.workingStartTime }} - {{ dashboard.attendancePeriod.workingEndTime }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Tolerance: {{ dashboard.attendancePeriod.toleranceMinutes }} minutes
                  </p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <!-- Present Employees -->
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="flex items-center">
                <UserCheck class="w-5 h-5 mr-2 text-green-600" />
                Present Employees ({{ dashboard.presentEmployees.length }})
              </UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="dashboard.presentEmployees.length > 0" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="employee in dashboard.presentEmployees" :key="employee.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <p class="text-sm font-medium text-gray-900">
                                    {{ employee.firstName }} {{ employee.lastName }}
                                  </p>
                                  <p class="text-sm text-gray-500">{{ employee.email }}</p>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ employee.department }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ employee.position }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ formatTime(employee.checkIn) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ formatTime(employee.checkOut) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ employee.workDuration ? `${(employee.workDuration / 60).toFixed(1)}h` : '-' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex flex-col gap-1">
                                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="getStatusBadge(employee.status)">
                                    {{ employee.status }}
                                  </span>
                                  <span v-if="employee.isLate" class="text-xs text-yellow-600">
                                      Late by {{ employee.minutesLate }} min
                                  </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <p v-else class="text-center text-gray-500 py-4">No employees present yet</p>
            </UiCardContent>
          </UiCard>

           <!-- Absent Employees -->
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="flex items-center">
                <UserX class="w-5 h-5 mr-2 text-red-600" />
                Absent Employees ({{ dashboard.absentEmployees.length }})
              </UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
               <div v-if="dashboard.absentEmployees.length > 0" class="overflow-x-auto">
                 <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                      </tr>
                    </thead>
                     <tbody class="bg-white divide-y divide-gray-200">
                         <tr v-for="employee in dashboard.absentEmployees" :key="employee.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <p class="text-sm font-medium text-gray-900">
                                    {{ employee.firstName }} {{ employee.lastName }}
                                  </p>
                                  <p class="text-sm text-gray-500">{{ employee.email }}</p>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ employee.department }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ employee.position }}
                            </td>
                         </tr>
                     </tbody>
                 </table>
               </div>
               <p v-else class="text-center text-gray-500 py-4">All employees are present! 🎉</p>
            </UiCardContent>
          </UiCard>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { startOfMonth, endOfMonth, format } from 'date-fns'
import { 
    Calendar, 
    Timer, 
    LogIn, 
    LogOut, 
    MapPin, 
    UserCheck, 
    AlertTriangle, 
    UserX 
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useClockIn, useClockOut, useTodayAttendance, useAttendanceStats } from '@/composables/useAttendance'
import DigitalClock from '@/components/attendance/DigitalClock.vue'
import EmployeeSelector from '@/components/attendance/EmployeeSelector.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const selectedEmployeeId = ref('')
const notes = ref('')
const isGettingLocation = ref(false)

// Data Fetching
const { data: todayAttendance, loading: loadingToday, refresh: refreshToday } = useTodayAttendance()
const { mutate: clockIn, loading: clockingIn } = useClockIn()
const { mutate: clockOut, loading: clockingOut } = useClockOut()

// Stats
const currentDate = new Date()
const startDate = format(startOfMonth(currentDate), 'yyyy-MM-dd')
const endDate = format(endOfMonth(currentDate), 'yyyy-MM-dd')

const { data: stats, refresh: refreshStats } = useAttendanceStats(startDate, endDate, selectedEmployeeId)

// Helper Functions
const getLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'))
            return
        }

        isGettingLocation.value = true
        navigator.geolocation.getCurrentPosition(
            (position) => {
                isGettingLocation.value = false
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error) => {
                isGettingLocation.value = false
                reject(error)
            }
        )
    })
}

const handleClockIn = async () => {
    try {
        const location = await getLocation()
        await clockIn({
            ...location,
            notes: notes.value || undefined
        })
        notes.value = ''
        // Refresh data
        refreshToday()
        refreshStats()
        // could show toast here
    } catch (error) {
        alert('Please enable location access to clock in')
        console.error(error)
    }
}

const handleClockOut = async () => {
    try {
        const location = await getLocation()
        await clockOut({
            ...location,
            notes: notes.value || undefined
        })
        notes.value = ''
        // Refresh data
        refreshToday()
        refreshStats()
    } catch (error) {
         alert('Please enable location access to clock out')
         console.error(error)
    }
}

const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) return '--:--'
    return new Date(dateString).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    })
}

const getStatusColor = (status: string | undefined) => {
    const colors: Record<string, string> = {
        PRESENT: 'text-green-600 bg-green-50 ring-green-500/20',
        LATE: 'text-yellow-600 bg-yellow-50 ring-yellow-500/20',
        ABSENT: 'text-red-600 bg-red-50 ring-red-500/20',
        EXCUSED: 'text-blue-600 bg-blue-50 ring-blue-500/20',
    }
    return colors[status || ''] || 'text-gray-600 bg-gray-50 ring-gray-500/20'
}

// Watch for employee selection change to refresh specific stats?
// useAttendanceStats auto-refreshes when selectedEmployeeId changes because it's a ref passed to useFetch query
</script>

<template>
    <div class="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header with Clock -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">My Attendance</h2>
           <p class="flex items-center text-gray-500 mt-1">
            <Calendar class="w-4 h-4 mr-2" />
            {{ format(new Date(), 'EEEE, d MMMM yyyy') }}
          </p>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-xs text-gray-400 uppercase font-medium mb-1">Current Time</div>
          <DigitalClock />
        </div>
      </div>

      <!-- Employee Selector for HR/SUPER/ADMIN -->
      <UiCard v-if="user?.role === 'HR' || user?.role === 'SUPER' || user?.role === 'ADMIN'" class="border-none shadow-sm bg-gray-50">
          <UiCardContent class="pt-6">
            <EmployeeSelector v-model="selectedEmployeeId" />
          </UiCardContent>
      </UiCard>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Action Section (Today's Status + Clock In/Out) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Hero Card: Today's Status -->
          <div class="bg-white rounded-2xl shadow-xl shadow-brand-navy/5 overflow-hidden border border-gray-100">
             <div class="p-8">
               <div class="flex justify-between items-start mb-8">
                 <div>
                   <div class="flex items-center gap-2 mb-2">
                     <Calendar class="w-5 h-5 text-gray-400" />
                     <h3 class="text-lg font-medium text-gray-500">Today's Status</h3>
                   </div>
                   <div v-if="loadingToday" class="h-8 w-32 bg-gray-100 rounded animate-pulse mt-2"></div>
                   <div v-else class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mt-2 ring-1 ring-inset" :class="getStatusColor(todayAttendance?.status)">
                     {{ todayAttendance?.status || 'NOT STARTED' }}
                   </div>
                 </div>
                 
                 <div v-if="todayAttendance?.workDuration" class="text-right">
                   <div class="flex items-center justify-end gap-2 mb-2">
                     <Timer class="w-5 h-5 text-gray-400" />
                     <p class="text-sm text-gray-500">Duration</p>
                   </div>
                   <p class="text-3xl font-bold text-brand-navy">
                     {{ (todayAttendance.workDuration / 60).toFixed(1) }}<span class="text-sm font-normal text-gray-400 ml-1">hrs</span>
                   </p>
                 </div>
               </div>

               <div class="grid grid-cols-2 gap-8 mb-8">
                 <div>
                    <div class="flex items-center text-gray-400 mb-2">
                      <LogIn class="w-4 h-4 mr-2" />
                      <span class="text-xs font-medium uppercase tracking-wider">Clock In</span>
                    </div>
                    <div class="text-2xl font-mono text-gray-900">
                      {{ loadingToday ? '...' : formatTime(todayAttendance?.checkIn) }}
                    </div>
                 </div>
                 <div>
                    <div class="flex items-center text-gray-400 mb-2">
                      <LogOut class="w-4 h-4 mr-2" />
                      <span class="text-xs font-medium uppercase tracking-wider">Clock Out</span>
                    </div>
                    <div class="text-2xl font-mono text-gray-900">
                      {{ loadingToday ? '...' : formatTime(todayAttendance?.checkOut) }}
                    </div>
                 </div>
               </div>

               <!-- Notes Input -->
               <div class="mb-6">
                  <textarea
                    v-model="notes"
                    placeholder="Add notes for your attendance (optional)..."
                    class="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-navy/20 resize-none transition-all placeholder:text-gray-400 outline-none"
                    rows="2"
                  />
               </div>

               <!-- Action Buttons -->
               <div class="grid grid-cols-2 gap-4">
                 <UiButton
                   @click="handleClockIn"
                   :disabled="clockingIn || isGettingLocation || !!todayAttendance?.checkIn"
                   class="h-14 text-lg font-bold shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0 text-white"
                   :class="!!todayAttendance?.checkIn ? 'opacity-50 grayscale' : ''"
                 >
                   <span v-if="isGettingLocation" class="flex items-center">
                       <MapPin class="w-5 h-5 mr-2 animate-pulse" />
                       Locating...
                   </span>
                   <span v-else class="flex items-center">
                       <LogIn class="w-5 h-5 mr-2" />
                       Clock In
                   </span>
                 </UiButton>
                 
                 <UiButton
                   @click="handleClockOut"
                   :disabled="clockingOut || isGettingLocation || !todayAttendance?.checkIn"
                   class="h-14 text-lg font-bold shadow-lg shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    :class="!todayAttendance?.checkIn ? 'opacity-50 grayscale' : ''"
                 >
                    <span v-if="isGettingLocation" class="flex items-center">
                       <MapPin class="w-5 h-5 mr-2 animate-pulse" />
                       Locating...
                   </span>
                   <span v-else class="flex items-center">
                       <LogOut class="w-5 h-5 mr-2" />
                       Clock Out
                   </span>
                 </UiButton>
               </div>
               
               <div class="mt-4 flex items-center justify-center text-xs text-gray-400">
                  <MapPin class="w-3 h-3 mr-1" />
                  Your location is recorded securely
               </div>
             </div>
          </div>
        </div>

        <!-- Stats Column -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-gray-900">Month Summary</h3>
            <NuxtLink :to="tenantSlug ? `/${tenantSlug}/dashboard/attendance/history` : '/dashboard/attendance/history'" class="text-xs font-medium text-brand-navy hover:underline">
              View History
            </NuxtLink>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <!-- Present Card -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 relative overflow-hidden">
               <div class="absolute right-0 top-0 p-3 opacity-10"><UserCheck class="w-16 h-16 text-emerald-600" /></div>
               <p class="text-emerald-600 font-medium text-sm">Present</p>
               <p class="text-3xl font-bold text-emerald-700 mt-1">{{ stats?.statusCounts?.PRESENT || 0 }}<span class="text-sm font-normal text-emerald-600/60 ml-1">days</span></p>
            </div>

            <!-- Late Card -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 relative overflow-hidden">
               <div class="absolute right-0 top-0 p-3 opacity-10"><AlertTriangle class="w-16 h-16 text-amber-600" /></div>
               <p class="text-amber-600 font-medium text-sm">Late</p>
               <p class="text-3xl font-bold text-amber-700 mt-1">{{ stats?.statusCounts?.LATE || 0 }}<span class="text-sm font-normal text-amber-600/60 ml-1">days</span></p>
            </div>

            <!-- Absent Card -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 relative overflow-hidden">
               <div class="absolute right-0 top-0 p-3 opacity-10"><UserX class="w-16 h-16 text-rose-600" /></div>
               <p class="text-rose-600 font-medium text-sm">Absent</p>
               <p class="text-3xl font-bold text-rose-700 mt-1">{{ stats?.statusCounts?.ABSENT || 0 }}<span class="text-sm font-normal text-rose-600/60 ml-1">days</span></p>
            </div>

            <!-- Avg Hours Card -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 relative overflow-hidden">
               <div class="absolute right-0 top-0 p-3 opacity-10"><Timer class="w-16 h-16 text-indigo-600" /></div>
               <p class="text-indigo-600 font-medium text-sm">Avg Hours/Day</p>
               <p class="text-3xl font-bold text-indigo-700 mt-1">
                 {{ stats?.averageWorkDuration ? (stats.averageWorkDuration / 60).toFixed(1) : '0.0' }}
                 <span class="text-sm font-normal text-indigo-600/60 ml-1">hrs</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Calendar,
  X 
} from 'lucide-vue-next'
import type { AttendancePeriod } from '@/types/attendance-period'

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string

definePageMeta({
  layout: 'dashboard'
})

// Filter inputs
const searchInput = ref('')
const isActiveInput = ref('')

// Applied filters
const searchQuery = ref('')
const isActiveQuery = ref('')

// Pagination
const page = ref(1)
const limit = ref(10)

const { data: response, loading, error, refresh } = useAttendancePeriods(page, limit, searchQuery, isActiveQuery)
const { mutate: deletePeriod } = useDeleteAttendancePeriod()

const viewPeriod = ref<AttendancePeriod | null>(null)
const deleteConfirm = ref<string | null>(null)

const handleApplyFilters = () => {
  searchQuery.value = searchInput.value
  isActiveQuery.value = isActiveInput.value
  page.value = 1 // Reset to first page
}

const handleResetFilters = () => {
  searchInput.value = ''
  isActiveInput.value = ''
  searchQuery.value = ''
  isActiveQuery.value = ''
  page.value = 1
}

const handleDelete = async () => {
  if (deleteConfirm.value) {
    await deletePeriod(deleteConfirm.value)
    deleteConfirm.value = null
    refresh()
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateLong = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const formatDateShort = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatDateShortYear = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const periods = computed(() => response.value?.data || [])
const activePeriod = computed(() => periods.value.find(p => p.isActive))

const getTimelineStatus = (period: AttendancePeriod) => {
  const startDate = new Date(period.startDate)
  const endDate = new Date(period.endDate)
  const today = new Date()
  
  const isOngoing = today >= startDate && today <= endDate
  const isPast = today > endDate
  const isFuture = today < startDate

  return { isOngoing, isPast, isFuture }
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Attendance Periods</h2>
      <NuxtLink :to="`/${tenantSlug}/dashboard/attendance-periods/create`">
        <UiButton>
          <Plus class="w-4 h-4 mr-2" />
          Add Period
        </UiButton>
      </NuxtLink>
    </div>

    <!-- Filters -->
    <UiCard>
      <UiCardContent class="pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="relative lg:col-span-2">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or year..."
              v-model="searchInput"
              class="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"
            />
          </div>
          <div class="relative">
            <select
              v-model="isActiveInput"
              class="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div class="flex gap-2">
            <UiButton @click="handleApplyFilters" class="flex-1">
              <Filter class="w-4 h-4 mr-2" />
              Apply
            </UiButton>
            <UiButton variant="secondary" @click="handleResetFilters" class="flex-1">
              Reset
            </UiButton>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Table -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>All Periods</UiCardTitle>
      </UiCardHeader>
      <UiCardContent class="overflow-x-auto">
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
          <p class="text-gray-600">Loading attendance periods...</p>
        </div>
        <div v-else-if="error" class="text-center text-red-600 py-6">
          Error loading attendance periods
        </div>
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Days/Hours</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holidays</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="period in periods" :key="period.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ period.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(period.startDate) }} - {{ formatDate(period.endDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ period.workingDaysPerWeek }} days / {{ period.workingHoursPerDay }} hours
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ period.holidays?.length || 0 }} holidays
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  period.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]">
                  <template v-if="period.isActive">
                    <CheckCircle class="w-3 h-3 mr-1" /> Active
                  </template>
                  <template v-else>
                    <XCircle class="w-3 h-3 mr-1" /> Inactive
                  </template>
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <UiButton 
                    variant="secondary" 
                    class="p-2" 
                    @click="viewPeriod = period"
                    title="View Details"
                  >
                    <Eye class="w-4 h-4" />
                  </UiButton>
                  <NuxtLink :to="`/${tenantSlug}/dashboard/attendance-periods/${period.id}`">
                    <UiButton variant="secondary" class="p-2" title="Edit Period">
                      <Edit class="w-4 h-4" />
                    </UiButton>
                  </NuxtLink>
                  <UiButton 
                    variant="danger" 
                    class="p-2" 
                    @click="deleteConfirm = period.id"
                    title="Delete Period"
                  >
                    <Trash2 class="w-4 h-4" />
                  </UiButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </UiCardContent>
    </UiCard>

    <!-- Calendar Timeline View -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Period Timeline</UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
          <p class="text-gray-600">Loading timeline...</p>
        </div>
        <div v-else class="space-y-4">
          <!-- Active Period Info -->
          <div v-if="activePeriod" class="p-4 bg-brand-light border-l-4 border-brand-navy rounded">
            <div class="flex items-center">
              <Calendar class="w-5 h-5 text-brand-navy mr-2" />
              <div>
                <p class="font-bold text-brand-navy">
                  Active Period: {{ activePeriod.name }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ formatDateLong(activePeriod.startDate) }} - {{ formatDateLong(activePeriod.endDate) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="relative">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
            <div class="space-y-6 ml-6">
              <div v-for="period in periods" :key="period.id" class="relative">
                 <div :class="[
                   'absolute -left-7-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2',
                   period.isActive ? 'bg-brand-navy border-brand-navy' : 
                   getTimelineStatus(period).isPast ? 'bg-gray-300 border-gray-400' :
                   'bg-white border-brand-cyan'
                 ]"></div>
                 
                 <div :class="[
                   'p-4 rounded-lg border-2',
                   period.isActive ? 'border-brand-navy bg-brand-light' : 'border-gray-200 bg-white'
                 ]">
                   <div class="flex items-start justify-between">
                     <div class="flex-1">
                       <div class="flex items-center gap-2 mb-2">
                         <h4 :class="['font-bold', period.isActive ? 'text-brand-navy' : 'text-gray-900']">
                           {{ period.name }}
                         </h4>
                         <span v-if="period.isActive" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                           Active
                         </span>
                         <span v-if="getTimelineStatus(period).isOngoing && !period.isActive" class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                           Ongoing
                         </span>
                         <span v-if="getTimelineStatus(period).isPast" class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                           Past
                         </span>
                         <span v-if="getTimelineStatus(period).isFuture" class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                           Upcoming
                         </span>
                       </div>
                       <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                         <div>
                           <p class="text-gray-500">Duration</p>
                           <p class="font-medium text-gray-900">
                             {{ formatDateShort(period.startDate) }} - {{ formatDateShortYear(period.endDate) }}
                           </p>
                         </div>
                         <div>
                           <p class="text-gray-500">Working Schedule</p>
                           <p class="font-medium text-gray-900">
                             {{ period.workingDaysPerWeek }} days/week, {{ period.workingHoursPerDay }} hrs/day
                           </p>
                         </div>
                         <div>
                           <p class="text-gray-500">Holidays</p>
                           <p class="font-medium text-gray-900">
                             {{ period.holidays?.length || 0 }} configured
                           </p>
                         </div>
                       </div>
                       <p v-if="period.description" class="mt-2 text-sm text-gray-600">{{ period.description }}</p>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
          
          <div v-if="periods.length === 0" class="text-center py-12 text-gray-500">
             No attendance periods configured yet
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- View Period Modal -->
    <div v-if="viewPeriod" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">Period Details</h3>
          <button @click="viewPeriod = null" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Name</label>
              <p class="text-gray-900">{{ viewPeriod.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                viewPeriod.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              ]">
                {{ viewPeriod.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
              <p class="text-gray-900">{{ formatDateLong(viewPeriod.startDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">End Date</label>
              <p class="text-gray-900">{{ formatDateLong(viewPeriod.endDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Working Days Per Week</label>
              <p class="text-gray-900">{{ viewPeriod.workingDaysPerWeek }} days</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Working Hours Per Day</label>
              <p class="text-gray-900">{{ viewPeriod.workingHoursPerDay }} hours</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <p class="text-gray-900">{{ viewPeriod.description || '-' }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Holidays</label>
              <p class="text-gray-900">{{ viewPeriod.holidays?.length || 0 }} holidays configured</p>
            </div>
          </div>
        </div>
        <div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
          <UiButton @click="viewPeriod = null" variant="secondary" class="w-full">
            Close
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="deleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Attendance Period</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this attendance period? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <UiButton variant="secondary" @click="deleteConfirm = null">
            Cancel
          </UiButton>
          <UiButton variant="danger" @click="handleDelete">
            Delete
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

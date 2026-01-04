<script setup lang="ts">
import { ref, computed } from 'vue'
import { Filter, Calendar, Eye } from 'lucide-vue-next'
import { useAttendanceHistory } from '@/composables/useAttendance'
import { useAuthStore } from '@/stores/auth'

import EmployeeSelector from '@/components/attendance/EmployeeSelector.vue'

const props = defineProps<{
  isAdmin: boolean;
}>()

const filters = ref({
  startDate: '',
  endDate: '',
  status: '',
  employeeId: ''
})

const appliedFilters = ref({
  startDate: '',
  endDate: '',
  status: '',
  employeeId: ''
})

const page = ref(1)
const limit = ref(10)

const { data: response, loading, refresh } = useAttendanceHistory(page, limit, {
    startDate: computed(() => appliedFilters.value.startDate),
    endDate: computed(() => appliedFilters.value.endDate),
    status: computed(() => appliedFilters.value.status),
    employeeId: computed(() => appliedFilters.value.employeeId)
})

const attendanceRecords = computed(() => response.value?.data || [])
const totalPages = computed(() => response.value?.meta?.totalPages || 0)

const applyFilters = () => {
    appliedFilters.value = { ...filters.value }
    page.value = 1
}

const resetFilters = () => {
    filters.value = {
        startDate: '',
        endDate: '',
        status: '',
        employeeId: ''
    }
    appliedFilters.value = { ...filters.value }
    page.value = 1
}

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case 'PRESENT': return 'success'
        case 'LATE': return 'warning'
        case 'ABSENT': return 'destructive'
        case 'EXCUSED': return 'default'
        default: return 'secondary'
    }
}

const formatTime = (dateString?: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    })
}

// view modal
const viewAttendance = ref<any>(null)
</script>

<template>
  <div class="space-y-6">
    <UiCard>
        <UiCardContent class="pt-6">
            <div class="space-y-4">
                <EmployeeSelector 
                    v-if="isAdmin" 
                    v-model="filters.employeeId" 
                    class="max-w-md"
                />

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <UiInput 
                      label="Start Date" 
                      type="date" 
                      v-model="filters.startDate" 
                    />
                    <UiInput 
                      label="End Date" 
                      type="date" 
                      v-model="filters.endDate" 
                    />
                    <UiSelect 
                      label="Status"
                      v-model="filters.status"
                      :options="[
                          { label: 'All Status', value: '' },
                          { label: 'Present', value: 'PRESENT' },
                          { label: 'Late', value: 'LATE' },
                          { label: 'Absent', value: 'ABSENT' },
                          { label: 'Excused', value: 'EXCUSED' },
                      ]"
                    />
                    <div class="flex items-end gap-2">
                        <UiButton @click="applyFilters" class="flex-1">
                            <Filter class="w-4 h-4 mr-2" />
                            Apply
                        </UiButton>
                        <UiButton variant="secondary" @click="resetFilters" class="flex-1">
                            Reset
                        </UiButton>
                    </div>
                </div>
            </div>
        </UiCardContent>
    </UiCard>

    <UiCard>
        <UiCardHeader><UiCardTitle>Attendance Records</UiCardTitle></UiCardHeader>
        <UiCardContent class="overflow-x-auto">
            <div v-if="loading" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
            </div>

            <table v-else class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th v-if="isAdmin" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clock In</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clock Out</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Hours</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="attendanceRecords.length === 0">
                        <td :colspan="isAdmin ? 7 : 6" class="px-6 py-8 text-center text-gray-500">
                            No attendance records found
                        </td>
                    </tr>
                    <tr v-for="record in attendanceRecords" :key="record.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                             <div class="flex items-center">
                                <Calendar class="w-4 h-4 mr-2 text-gray-400" />
                                {{ formatDate(record.date) }}
                            </div>
                        </td>
                        <td v-if="isAdmin" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ record.employee?.firstName }} {{ record.employee?.lastName }}
                        </td>
                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ formatTime(record.checkIn) }}
                        </td>
                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ formatTime(record.checkOut) }}
                        </td>
                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ record.workDuration ? (record.workDuration / 60).toFixed(1) + 'h' : '-' }}
                        </td>
                         <td class="px-6 py-4 whitespace-nowrap">
                            <UiBadge :variant="getStatusBadgeVariant(record.status)">
                                {{ record.status }}
                            </UiBadge>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <UiButton variant="secondary" class="p-2 h-8 w-8" @click="viewAttendance = record">
                                <Eye class="w-4 h-4" />
                            </UiButton>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination logic could act here -->
             <div v-if="totalPages > 1" class="mt-4 flex justify-between items-center">
                 <UiButton :disabled="page <= 1" @click="page--" variant="secondary">Previous</UiButton>
                 <span class="text-sm text-gray-600">Page {{ page }} of {{ totalPages }}</span>
                 <UiButton :disabled="page >= totalPages" @click="page++" variant="secondary">Next</UiButton>
             </div>
        </UiCardContent>
    </UiCard>

    <UiDialog :open="!!viewAttendance" @close="viewAttendance = null" title="Attendance Details">
        <div v-if="viewAttendance" class="space-y-4">
             <div v-if="viewAttendance.employee" class="bg-gray-50 p-3 rounded-lg text-sm mb-4">
                <p class="font-bold text-gray-900">{{ viewAttendance.employee.firstName }} {{ viewAttendance.employee.lastName }}</p>
                <p class="text-gray-500">{{ viewAttendance.employee.position }} - {{ viewAttendance.employee.department }}</p>
             </div>
             
             <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p class="text-gray-500 font-medium">Date</p>
                    <p>{{ formatDate(viewAttendance.date) }}</p>
                </div>
                <div>
                    <p class="text-gray-500 font-medium">Status</p>
                    <UiBadge :variant="getStatusBadgeVariant(viewAttendance.status)">{{ viewAttendance.status }}</UiBadge>
                </div>
                 <div>
                    <p class="text-gray-500 font-medium">Check In</p>
                    <p>{{ formatTime(viewAttendance.checkIn) }}</p>
                </div>
                 <div>
                    <p class="text-gray-500 font-medium">Check Out</p>
                    <p>{{ formatTime(viewAttendance.checkOut) }}</p>
                </div>
                 <div class="col-span-2" v-if="viewAttendance.notes">
                    <p class="text-gray-500 font-medium">Notes</p>
                    <p class="bg-gray-50 p-2 rounded border border-gray-100 mt-1">{{ viewAttendance.notes }}</p>
                </div>
             </div>
        </div>
        <div class="mt-6 flex justify-end">
            <UiButton variant="secondary" @click="viewAttendance = null">Close</UiButton>
        </div>
    </UiDialog>
  </div>
</template>

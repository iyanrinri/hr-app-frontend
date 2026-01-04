<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowLeft, Plus, Trash2, Calendar } from 'lucide-vue-next'
import type { AttendancePeriod, Holiday } from '@/types/attendance-period'

const route = useRoute()
const router = useRouter()
const tenantSlug = route.params.tenant_slug as string
const id = route.params.id as string

definePageMeta({
  layout: 'dashboard'
})

const { data: period, loading: loadingPeriod, error: errorPeriod } = useAttendancePeriod(id)
const { mutate: updatePeriod, loading: updating } = useUpdateAttendancePeriod()

const { data: holidays, refresh: refreshHolidays } = useHolidays(id)
const { mutate: createHoliday } = useCreateHoliday()
const { mutate: deleteHoliday } = useDeleteHoliday()

// Form Data
const form = ref<Partial<AttendancePeriod>>({
  name: '',
  startDate: '',
  endDate: '',
  workingDaysPerWeek: 5,
  workingHoursPerDay: 8,
  workingStartTime: '',
  workingEndTime: '',
  allowSaturdayWork: false,
  allowSundayWork: false,
  lateToleranceMinutes: 0,
  earlyLeaveToleranceMinutes: 0,
  description: '',
  isActive: false
})

watch(period, (p) => {
  if (p) {
    form.value = {
      name: p.name,
      startDate: p.startDate.split('T')[0],
      endDate: p.endDate.split('T')[0],
      workingDaysPerWeek: p.workingDaysPerWeek,
      workingHoursPerDay: p.workingHoursPerDay,
      workingStartTime: p.workingStartTime,
      workingEndTime: p.workingEndTime,
      allowSaturdayWork: p.allowSaturdayWork,
      allowSundayWork: p.allowSundayWork,
      lateToleranceMinutes: p.lateToleranceMinutes,
      earlyLeaveToleranceMinutes: p.earlyLeaveToleranceMinutes,
      description: p.description || '',
      isActive: p.isActive
    }
  }
}, { immediate: true })

const goBack = () => {
  router.push(`/${tenantSlug}/dashboard/attendance-periods`)
}

const handleSubmit = async () => {
  if (!form.value.name || !form.value.startDate || !form.value.endDate) {
    alert('Please fill in all required fields')
    return
  }

  // description optional
  const payload = { ...form.value }
  
  try {
    await updatePeriod(id, payload)
    alert('Attendance period updated successfully')
  } catch (e) {
    console.error(e)
    alert('Failed to update attendance period')
  }
}

// Holiday Logic
const showHolidayForm = ref(false)
const holidayForm = ref({
  name: '',
  date: '',
  isNational: false,
  isRecurring: false,
  description: ''
})

const handleAddHoliday = async () => {
  if (!holidayForm.value.name || !holidayForm.value.date) {
    alert('Name and Date are required')
    return
  }

  try {
    await createHoliday({
      ...holidayForm.value,
      attendancePeriodId: id,
      description: holidayForm.value.description || null
    })
    
    // Reset form
    holidayForm.value = {
      name: '',
      date: '',
      isNational: false,
      isRecurring: false,
      description: ''
    }
    showHolidayForm.value = false
    refreshHolidays()
  } catch (e) {
    console.error(e)
    alert('Failed to add holiday')
  }
}

const handleDeleteHoliday = async (holidayId: string) => {
  if (confirm('Are you sure you want to remove this holiday?')) {
    await deleteHoliday(holidayId)
    refreshHolidays()
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center space-x-4">
      <UiButton variant="ghost" @click="goBack">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </UiButton>
      <h2 class="text-2xl font-bold text-gray-900">Edit Attendance Period</h2>
    </div>

    <div v-if="loadingPeriod" class="text-center py-12">Loading...</div>
    <div v-else-if="errorPeriod || !period" class="text-center py-12 text-red-500">Error loading period details</div>

    <template v-else>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Period Details</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <UiInput
                  label="Period Name"
                  v-model="form.name"
                  required
                />
              </div>
              <UiInput
                label="Start Date"
                type="date"
                v-model="form.startDate"
                required
              />
              <UiInput
                label="End Date"
                type="date"
                v-model="form.endDate"
                required
              />
              <UiInput
                label="Working Days Per Week"
                type="number"
                min="1"
                max="7"
                v-model.number="form.workingDaysPerWeek"
                required
              />
              <UiInput
                label="Working Hours Per Day"
                type="number"
                min="1"
                max="24"
                v-model.number="form.workingHoursPerDay"
                required
              />
              <UiInput
                label="Working Start Time"
                type="time"
                v-model="form.workingStartTime"
                required
              />
              <UiInput
                label="Working End Time"
                type="time"
                v-model="form.workingEndTime"
                required
              />
              <UiInput
                label="Late Tolerance (Minutes)"
                type="number"
                min="0"
                max="120"
                v-model.number="form.lateToleranceMinutes"
                required
              />
              <UiInput
                label="Early Leave Tolerance (Minutes)"
                type="number"
                min="0"
                max="120"
                v-model.number="form.earlyLeaveToleranceMinutes"
                required
              />

              <div class="md:col-span-2 space-y-3">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    v-model="form.allowSaturdayWork"
                  />
                  <span class="text-sm font-medium text-gray-900">Allow Saturday Work</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    v-model="form.allowSundayWork"
                  />
                  <span class="text-sm font-medium text-gray-900">Allow Sunday Work</span>
                </label>
              </div>

              <div class="md:col-span-2">
                <UiTextarea
                  label="Description"
                  placeholder="Optional description for this period"
                  v-model="form.description"
                />
              </div>

              <div class="md:col-span-2">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    v-model="form.isActive"
                  />
                  <span class="text-sm font-medium text-gray-900">Active Period</span>
                </label>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <UiButton type="button" variant="secondary" @click="goBack">
                Cancel
              </UiButton>
              <UiButton type="submit" :disabled="updating">
                {{ updating ? 'Saving...' : 'Save Changes' }}
              </UiButton>
            </div>
          </form>
        </UiCardContent>
      </UiCard>

      <!-- Holidays Section -->
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between">
          <UiCardTitle>Holidays</UiCardTitle>
          <UiButton @click="showHolidayForm = !showHolidayForm">
            <Plus class="w-4 h-4 mr-2" />
            Add Holiday
          </UiButton>
        </UiCardHeader>
        <UiCardContent>
          <div v-if="showHolidayForm" class="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 class="font-bold text-gray-900 mb-4">New Holiday</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UiInput
                label="Holiday Name"
                v-model="holidayForm.name"
              />
              <UiInput
                label="Date"
                type="date"
                v-model="holidayForm.date"
              />
              <div class="md:col-span-2">
                <UiInput
                  label="Description"
                  v-model="holidayForm.description"
                />
              </div>
              <div class="flex items-center space-x-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    v-model="holidayForm.isNational"
                  />
                  <span class="text-sm font-medium text-gray-900">National Holiday</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    v-model="holidayForm.isRecurring"
                  />
                  <span class="text-sm font-medium text-gray-900">Recurring</span>
                </label>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-4">
              <UiButton variant="secondary" @click="showHolidayForm = false">
                Cancel
              </UiButton>
              <UiButton @click="handleAddHoliday">
                Add Holiday
              </UiButton>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="holidays && holidays.length > 0">
                  <tr v-for="holiday in holidays" :key="holiday.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div class="flex items-center">
                        <Calendar class="w-4 h-4 mr-2 text-gray-400" />
                        {{ holiday.name }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(holiday.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex gap-2">
                        <span v-if="holiday.isNational" class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          National
                        </span>
                        <span v-if="holiday.isRecurring" class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                          Recurring
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <UiButton
                        variant="danger"
                        class="p-2"
                        @click="handleDeleteHoliday(holiday.id)"
                        title="Delete Holiday"
                      >
                        <Trash2 class="w-4 h-4" />
                      </UiButton>
                    </td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                    No holidays configured for this period
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>

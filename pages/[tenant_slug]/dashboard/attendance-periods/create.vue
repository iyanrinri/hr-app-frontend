<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import type { AttendancePeriod } from '@/types/attendance-period'

const route = useRoute()
const router = useRouter()
const tenantSlug = route.params.tenant_slug as string

definePageMeta({
  layout: 'dashboard'
})

const { mutate: createPeriod, loading } = useCreateAttendancePeriod()

// Default values as per Next.js version
const form = ref<Omit<AttendancePeriod, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>({
  name: '',
  startDate: '',
  endDate: '',
  workingDaysPerWeek: 5,
  workingHoursPerDay: 8,
  workingStartTime: '09:00',
  workingEndTime: '17:00',
  allowSaturdayWork: false,
  allowSundayWork: false,
  lateToleranceMinutes: 15,
  earlyLeaveToleranceMinutes: 15,
  description: '',
  isActive: true,
  // holidays: [] // optional
})

const goBack = () => {
  router.push(`/${tenantSlug}/dashboard/attendance-periods`)
}

const handleSubmit = async () => {
  // Manual simple validation
  if (!form.value.name || !form.value.startDate || !form.value.endDate) {
    alert('Please fill in all required fields')
    return
  }
  
  if (new Date(form.value.endDate) <= new Date(form.value.startDate)) {
    alert('End date must be after start date')
    return
  }

  const payload = { ...form.value }
  // description optional
  if (!payload.description) delete (payload as any).description

  try {
    await createPeriod(payload)
    goBack()
  } catch (e) {
    console.error(e)
    alert('Failed to create attendance period')
  }
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center space-x-4">
      <UiButton variant="ghost" @click="goBack">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </UiButton>
      <h2 class="text-2xl font-bold text-gray-900">Create Attendance Period</h2>
    </div>

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
                placeholder="e.g., January 2024"
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
                <span class="text-sm font-medium text-gray-900">Set as Active Period</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <UiButton type="button" variant="secondary" @click="goBack">
              Cancel
            </UiButton>
            <UiButton type="submit" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Period' }}
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>

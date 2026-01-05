<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useCreateOvertimeRequest, useUpdateOvertimeRequest } from '@/composables/useOvertimeCRUD'
import { useAllEmployees } from '@/composables/useEmployees'
import { useAuthStore } from '@/stores/auth'
import { format, differenceInMinutes, parse } from 'date-fns'
import type { OvertimeRequest } from '@/types/overtime'

const props = defineProps<{
  initialData?: OvertimeRequest
}>()

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

const { mutate: createRequest, loading: isCreating } = useCreateOvertimeRequest()
const { mutate: updateRequest, loading: isUpdating } = useUpdateOvertimeRequest()
const { data: employees } = useAllEmployees()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const isAdminOrHr = computed(() => ['ADMIN', 'SUPER', 'HR'].includes(user.value?.role || ''))
const isEditing = computed(() => !!props.initialData)
const isPending = computed(() => isCreating.value || isUpdating.value)

// Form State
const form = ref({
    employeeId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    reason: ''
})

const errors = ref<Record<string, string>>({})
const durationStr = ref('')

// Initialize form if editing
onMounted(() => {
    if (props.initialData) {
        form.value = {
            employeeId: props.initialData.employeeId ? String(props.initialData.employeeId) : '',
            date: format(new Date(props.initialData.date), 'yyyy-MM-dd'),
            startTime: format(new Date(props.initialData.startTime), 'HH:mm'),
            endTime: format(new Date(props.initialData.endTime), 'HH:mm'),
            reason: props.initialData.reason || ''
        }
    }
})

// Calculate Duration
watch([() => form.value.date, () => form.value.startTime, () => form.value.endTime], ([date, startTime, endTime]) => {
    if (date && startTime && endTime) {
        try {
            const start = parse(`${date} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date())
            let end = parse(`${date} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date())
            
            // Handle cross-midnight (if end time is earlier than start time, assume next day)
            // But usually for simple UI we assume same day unless explicit. 
            // The Next.js logic handled cross-midnight:
            if (end < start) {
                end = new Date(end.getTime() + 24 * 60 * 60 * 1000)
            }

            const diff = differenceInMinutes(end, start)
            const hours = Math.floor(diff / 60)
            const minutes = diff % 60
            durationStr.value = `${hours}h ${minutes}m`
        } catch (e) {
            durationStr.value = ''
        }
    } else {
        durationStr.value = ''
    }
})

const validate = () => {
    errors.value = {}
    if (!form.value.date) errors.value.date = 'Date is required'
    if (!form.value.startTime) errors.value.startTime = 'Start time is required'
    if (!form.value.endTime) errors.value.endTime = 'End time is required'
    if (!form.value.reason || form.value.reason.length < 3) errors.value.reason = 'Reason is required'
    return Object.keys(errors.value).length === 0
}

const onSubmit = async () => {
    if (!validate()) return

    try {
        const startDateTime = parse(`${form.value.date} ${form.value.startTime}`, 'yyyy-MM-dd HH:mm', new Date())
        let endDateTime = parse(`${form.value.date} ${form.value.endTime}`, 'yyyy-MM-dd HH:mm', new Date())
        
        if (endDateTime < startDateTime) {
             endDateTime = new Date(endDateTime.getTime() + 24 * 60 * 60 * 1000)
        }

        const employeeId = form.value.employeeId 
            ? Number(form.value.employeeId) 
            : (user.value?.id ? Number(user.value.id) : 0)

        const payload = {
            employeeId,
            date: form.value.date,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            reason: form.value.reason
        }

        const options = {
            onSuccess: () => emit('success')
        }

        if (isEditing.value && props.initialData) {
            await updateRequest(props.initialData.id, payload, options)
        } else {
            await createRequest(payload, options)
        }
    } catch (e) {
        // error handled in composable or toast
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div v-if="isAdminOrHr" class="space-y-2">
           <label class="text-sm font-medium text-gray-700">Employee</label>
           <select 
             v-model="form.employeeId"
             class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
             :disabled="isEditing"
           >
             <option value="">Select Employee (Yourself)</option>
             <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                {{ emp.name || emp.firstName + ' ' + emp.lastName }} ({{ emp.position }})
             </option>
           </select>
           <p class="text-xs text-gray-500">Leave empty to request for yourself.</p>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <UiInput 
            label="Date" 
            type="date" 
            v-model="form.date"
            :error="errors.date"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
         <UiInput 
            label="Start Time" 
            type="time" 
            v-model="form.startTime"
            :error="errors.startTime"
        />
        <UiInput 
            label="End Time" 
            type="time" 
            v-model="form.endTime"
            :error="errors.endTime"
        />
      </div>

      <div v-if="durationStr" class="bg-blue-50 text-brand-navy px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <span class="mr-2">⏱</span> Duration: {{ durationStr }}
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Reason</label>
        <textarea 
            v-model="form.reason"
            rows="3"
            class="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Justification for overtime..."
        ></textarea>
        <p v-if="errors.reason" class="text-sm text-red-500">{{ errors.reason }}</p>
      </div>

      <div class="flex justify-end gap-3 pt-4">
         <button type="button" @click="$emit('cancel')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
         </button>
         <button 
            type="submit" 
            :disabled="isPending"
            class="px-4 py-2 text-sm font-medium text-white bg-brand-navy rounded-md hover:opacity-90 disabled:opacity-50 flex items-center"
         >
            <span v-if="isPending" class="mr-2">...</span>
            {{ isEditing ? 'Update Request' : 'Submit Request' }}
         </button>
      </div>
    </form>
</template>

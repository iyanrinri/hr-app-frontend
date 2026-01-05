<script setup lang="ts">
import { ref, computed } from 'vue'
import { useActiveLeavePeriod, useLeaveTypes, useCreateLeaveRequest } from '@/composables/useLeaves'
import type { AssignLeavePayload } from '@/types/leaves'

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

const { data: activePeriod } = useActiveLeavePeriod()
// Wait for activePeriod to be loaded before fetching types
const periodId = computed(() => activePeriod.value?.id)
const { data: leaveTypes } = useLeaveTypes(periodId)
const { mutate: createRequest, loading: isPending } = useCreateLeaveRequest()

const form = ref<AssignLeavePayload>({
    leaveTypeConfigId: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    handoverNotes: ''
})

const errors = ref<Partial<Record<keyof AssignLeavePayload, string>>>({})

const validate = () => {
    errors.value = {}
    if (!form.value.leaveTypeConfigId) errors.value.leaveTypeConfigId = 'Please select a leave type'
    if (!form.value.startDate) errors.value.startDate = 'Start date is required'
    if (!form.value.endDate) errors.value.endDate = 'End date is required'
    if (!form.value.reason || form.value.reason.length < 3) errors.value.reason = 'Reason is required'
    return Object.keys(errors.value).length === 0
}

const selectedType = computed(() => leaveTypes.value?.find(t => String(t.id) === String(form.value.leaveTypeConfigId)))

const estDays = computed(() => {
    if (form.value.startDate && form.value.endDate) {
        const start = new Date(form.value.startDate)
        const end = new Date(form.value.endDate)
        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
            const diffTime = Math.abs(end.getTime() - start.getTime())
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        }
    }
    return 0
})

const onSubmit = async () => {
    if (!validate()) return

    try {
        await createRequest(form.value)
        emit('success')
    } catch (e) {
        // error handled
    }
}
</script>

<template>
   <form @submit.prevent="onSubmit" class="space-y-4">
      <div v-if="!activePeriod" class="p-4 bg-yellow-50 text-yellow-800 rounded-md">
           No active leave period found. Please contact HR.
      </div>
      <template v-else>
         <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Leave Type</label>
            <select 
               v-model="form.leaveTypeConfigId"
               class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
               <option value="">Select Leave Type</option>
               <option v-for="type in leaveTypes?.filter(t => t.isActive)" :key="type.id" :value="String(type.id)">
                   {{ type.name }}
               </option>
            </select>
            <p v-if="errors.leaveTypeConfigId" class="text-xs text-red-500">{{ errors.leaveTypeConfigId }}</p>

            <div v-if="selectedType" class="text-xs text-gray-500 mt-1">
                 Max {{ selectedType.maxConsecutiveDays }} consecutive days. Notice: {{ selectedType.advanceNoticeDays }} days.
            </div>
         </div>

         <div class="grid grid-cols-2 gap-4">
             <UiInput label="Start Date" type="date" v-model="form.startDate" :error="errors.startDate" />
             <UiInput label="End Date" type="date" v-model="form.endDate" :error="errors.endDate" />
         </div>

         <div v-if="estDays > 0" class="text-sm text-brand-navy font-medium">Estimated Duration: {{ estDays }} Days</div>

         <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Reason</label>
            <textarea 
               v-model="form.reason" 
               class="w-full min-h-[80px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy"
               placeholder="Why are you taking leave?"
            ></textarea>
            <p v-if="errors.reason" class="text-xs text-red-500">{{ errors.reason }}</p>
         </div>

         <UiInput label="Emergency Contact" v-model="form.emergencyContact" placeholder="+62..." :error="errors.emergencyContact" />

         <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Handover Notes (Optional)</label>
            <textarea 
               v-model="form.handoverNotes" 
               class="w-full min-h-[60px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy"
               placeholder="Who will cover your tasks?"
            ></textarea>
         </div>

         <div class="flex justify-end gap-3 pt-4">
             <UiButton type="button" variant="ghost" @click="$emit('cancel')">Cancel</UiButton>
             <UiButton type="submit" :disabled="isPending || !activePeriod">Submit Request</UiButton>
         </div>

      </template>
   </form>
</template>

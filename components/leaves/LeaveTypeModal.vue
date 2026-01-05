<script setup lang="ts">
import { ref } from 'vue'
import { useCreateLeaveType } from '@/composables/useLeaves'
import { X } from 'lucide-vue-next'
import type { CreateLeaveTypePayload } from '@/types/leaves'

const props = defineProps<{
  isOpen: boolean
  leavePeriodId: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void // To trigger refresh in parent
}>()

const { mutate: createType, loading: isPending } = useCreateLeaveType()

const form = ref<Omit<CreateLeaveTypePayload, 'leavePeriodId'>>({
    type: '',
    name: '',
    description: '',
    defaultQuota: 12,
    maxConsecutiveDays: 5,
    advanceNoticeDays: 3,
    isCarryForward: false,
    maxCarryForward: 0,
    isActive: true
})

const errors = ref<Partial<Record<keyof CreateLeaveTypePayload, string>>>({})

const validate = () => {
    errors.value = {}
    if (!form.value.type || form.value.type.length < 2) errors.value.type = 'Code required (e.g. ANNUAL)'
    if (!form.value.name || form.value.name.length < 2) errors.value.name = 'Name required'
    return Object.keys(errors.value).length === 0
}

const onSubmit = async () => {
    if (!validate()) return

    try {
        await createType({ ...form.value, leavePeriodId: props.leavePeriodId })
        emit('created')
        emit('close')
    } catch (e) {
        // error handling
    }
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
       <div class="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
         <div class="p-6 border-b flex justify-between items-center">
           <h3 class="text-lg font-bold">Add Leave Type</h3>
           <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
             <X class="w-5 h-5" />
           </button>
         </div>
         <div class="p-6">
           <form @submit.prevent="onSubmit" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <UiInput label="Type Code (e.g. ANNUAL)" v-model="form.type" :error="errors.type" />
                <UiInput label="Display Name" v-model="form.name" :error="errors.name" />
              </div>
              
              <div class="grid grid-cols-3 gap-4">
                 <UiInput label="Default Quota" type="number" v-model.number="form.defaultQuota" />
                 <UiInput label="Max Consec." type="number" v-model.number="form.maxConsecutiveDays" />
                 <UiInput label="Adv. Notice" type="number" v-model.number="form.advanceNoticeDays" />
              </div>

              <div class="space-y-2 p-3 bg-gray-50 rounded border">
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="form.isCarryForward" class="rounded border-gray-300" />
                  <span class="text-sm font-medium">Allow Carry Forward?</span>
                </label>
                <div v-if="form.isCarryForward">
                    <UiInput label="Max Carry Fwd Days" type="number" v-model.number="form.maxCarryForward" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="text-sm font-medium">Description</label>
                <textarea class="w-full border rounded p-2 text-sm" v-model="form.description" />
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <UiButton type="button" variant="ghost" @click="$emit('close')">Cancel</UiButton>
                <UiButton type="submit" :disabled="isPending">Create Type</UiButton>
              </div>
           </form>
         </div>
       </div>
    </div>
</template>

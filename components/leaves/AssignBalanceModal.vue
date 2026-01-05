<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus } from 'lucide-vue-next'
import type { LeaveType } from '@/types/leaves'

const props = defineProps<{
  isOpen: boolean
  employeeId: string
  employeeName: string
  leaveTypes: LeaveType[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'assigned'): void
}>()

const selectedTypeId = ref('')
const quota = ref(0)
const loading = ref(false)

watch(() => selectedTypeId.value, (newVal) => {
    const type = props.leaveTypes.find(t => String(t.id) === newVal)
    if (type) quota.value = type.defaultQuota
})

const selectedType = computed(() => props.leaveTypes.find(t => String(t.id) === selectedTypeId.value))

const handleAssign = async () => {
    // TODO: Implement assignment API call
    // const { mutate } = useAssignLeaveBalance()
    // await mutate(...)
    console.log('Assigning balance:', { 
        employeeId: props.employeeId, 
        leaveTypeConfigId: selectedTypeId.value, 
        quota: quota.value 
    })
    
    // Simulate success
    loading.value = true
    setTimeout(() => {
        loading.value = false
        emit('assigned')
        emit('close')
    }, 1000)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6 border-b flex justify-between items-center">
          <h3 class="text-lg font-bold">Assign Leave Balance</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <Plus class="w-5 h-5 rotate-45" />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <p class="text-sm text-gray-600">Employee</p>
            <p className="font-medium text-gray-900">{{ employeeName }}</p>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Leave Type</label>
            <select
              class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
              v-model="selectedTypeId"
            >
              <option value="">-- Select Leave Type --</option>
              <option v-for="type in leaveTypes" :key="type.id" :value="String(type.id)">
                  {{ type.name }}
              </option>
            </select>
          </div>

          <UiInput
            label="Quota (Days)"
            type="number"
            v-model.number="quota"
            placeholder="Enter quota"
          />

          <div v-if="selectedType" class="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              Default quota for {{ selectedType.name }}: {{ selectedType.defaultQuota }} days
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <UiButton type="button" variant="ghost" @click="$emit('close')">
              Cancel
            </UiButton>
            <UiButton 
              @click="handleAssign"
              :disabled="!selectedTypeId || quota <= 0 || loading"
            >
              Assign Balance
            </UiButton>
          </div>
        </div>
      </div>
  </div>
</template>

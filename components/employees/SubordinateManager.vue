<script setup lang="ts">
import { ref } from 'vue'
import type { Employee } from '@/types/employee'

const props = defineProps<{
  employeeId: string;
  currentSubordinates: Employee[];
  allEmployees: Employee[];
  isSaving: boolean;
}>()

const emit = defineEmits<{
  (e: 'save', ids: number[]): void
}>()

const isEditing = ref(false)
const selectedIds = ref<number[]>([])

const handleStartEdit = () => {
    selectedIds.value = props.currentSubordinates.map(e => Number(e.id))
    isEditing.value = true
}

const handleSave = () => {
    emit('save', selectedIds.value)
    isEditing.value = false
}

const toggleId = (id: number) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(i => i !== id)
    } else {
        selectedIds.value.push(id)
    }
}
</script>

<template>
  <div v-if="isEditing" class="space-y-4">
    <div class="max-h-[200px] overflow-y-auto border rounded-md p-2 space-y-1">
      <label v-for="e in allEmployees" :key="e.id" class="flex items-center gap-2 p-1 hover:bg-gray-50 rounded cursor-pointer">
         <input 
           type="checkbox" 
           :checked="selectedIds.includes(Number(e.id))"
           @change="toggleId(Number(e.id))"
           class="rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
         />
         <span class="text-sm">{{ e.firstName }} {{ e.lastName }}</span>
         <span class="text-xs text-gray-400">({{ e.position }})</span>
      </label>
    </div>
    <div class="flex gap-2 justify-end">
      <UiButton variant="ghost" @click="isEditing = false">Cancel</UiButton>
      <UiButton @click="handleSave" :isLoading="isSaving">Save Assignment</UiButton>
    </div>
  </div>

  <div v-else>
    <div class="mb-4 max-h-[150px] overflow-y-auto space-y-2">
      <div v-if="currentSubordinates.length === 0" class="text-sm text-gray-500 italic">
         No direct reports.
      </div>
      <div v-else v-for="sub in currentSubordinates" :key="sub.id" class="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-100">
          <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">
            {{ sub.firstName[0] }}{{ sub.lastName[0] }}
          </div>
          <div>
             <p class="text-sm font-medium">{{ sub.firstName }} {{ sub.lastName }}</p>
             <p class="text-xs text-gray-500">{{ sub.position }}</p>
          </div>
      </div>
    </div>
    <UiButton variant="secondary" class="w-full" @click="handleStartEdit">
      Manage Subordinates
    </UiButton>
  </div>
</template>

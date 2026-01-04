<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useEmployees } from '@/composables/useEmployees'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Get all employees for selector (limit 100 for now)
const { data: response } = useEmployees(1, 100)

const employees = computed(() => response.value?.data || [])

const isAuthorized = computed(() => {
    if (!user.value) return false
    return ['HR', 'SUPER', 'ADMIN'].includes(user.value.role)
})

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
}
</script>

<template>
  <div v-if="isAuthorized" class="w-full">
    <label class="block text-sm font-bold text-gray-900 mb-2">
      Select Employee
    </label>
    <div class="relative">
        <select
          :value="modelValue"
          @change="handleChange"
          class="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
        >
          <option value="">All Employees</option>
          <option 
            v-for="employee in employees" 
            :key="employee.id" 
            :value="employee.id"
          >
            {{ employee.firstName }} {{ employee.lastName }} ({{ employee.user.email }})
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Trash2, RotateCcw, Eye, X } from 'lucide-vue-next'
import type { Employee } from '@/types/employee'

const props = defineProps<{
  employees: Employee[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'restore', id: string): void
}>()

const route = useRoute()
const tenantSlug = route.params.tenant_slug

interface ConfirmAction {
  type: 'delete' | 'restore'
  id: string
}

const confirmAction = ref<ConfirmAction | null>(null)
const viewEmployee = ref<Employee | null>(null)

const handleConfirm = () => {
  if (confirmAction.value) {
    if (confirmAction.value.type === 'delete') {
      emit('delete', confirmAction.value.id)
    } else {
      emit('restore', confirmAction.value.id)
    }
    confirmAction.value = null
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateShort = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <div class="flex flex-col">
                <span>{{ employee.firstName }} {{ employee.lastName }}</span>
                <span v-if="employee.user?.deletedAt" class="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 w-fit">
                  Inactive User
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.user?.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.position }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.department }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDateShort(employee.joinDate) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <UiButton 
                  variant="secondary" 
                  class="p-2" 
                  @click="viewEmployee = employee"
                  title="View Details"
                >
                  <Eye class="w-4 h-4" />
                </UiButton>
                <NuxtLink :to="`/${tenantSlug}/dashboard/employees/${employee.id}`">
                  <UiButton variant="secondary" class="p-2" title="Edit Employee">
                    <Edit class="w-4 h-4" />
                  </UiButton>
                </NuxtLink>
                <UiButton 
                  v-if="employee.user?.deletedAt"
                  variant="secondary" 
                  class="p-2 bg-green-50 text-green-600 hover:bg-green-100 border-green-200" 
                  @click="confirmAction = { type: 'restore', id: employee.id }"
                  title="Restore Employee"
                >
                  <RotateCcw class="w-4 h-4" />
                </UiButton>
                <UiButton 
                  v-else
                  variant="danger" 
                  class="p-2" 
                  @click="confirmAction = { type: 'delete', id: employee.id }"
                  title="Delete Employee"
                >
                  <Trash2 class="w-4 h-4" />
                </UiButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Employee Modal -->
    <div v-if="viewEmployee" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">Employee Details</h3>
          <button
            @click="viewEmployee = null"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">First Name</label>
              <p class="text-gray-900">{{ viewEmployee.firstName }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
              <p class="text-gray-900">{{ viewEmployee.lastName }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <p class="text-gray-900">{{ viewEmployee.user?.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Role</label>
              <p class="text-gray-900 capitalize">{{ viewEmployee.user?.role }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Position</label>
              <p class="text-gray-900">{{ viewEmployee.position }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Department</label>
              <p class="text-gray-900">{{ viewEmployee.department }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Join Date</label>
              <p class="text-gray-900">{{ formatDate(viewEmployee.joinDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Base Salary</label>
              <p class="text-gray-900">
                {{ formatCurrency(viewEmployee.baseSalary) }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                viewEmployee.user?.deletedAt ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              ]">
                {{ viewEmployee.user?.deletedAt ? 'Inactive' : 'Active' }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Created At</label>
              <p class="text-gray-900">{{ formatDate(viewEmployee.createdAt) }}</p>
            </div>
          </div>
        </div>
        <div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
          <UiButton @click="viewEmployee = null" variant="secondary" class="w-full">
            Close
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="confirmAction" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          {{ confirmAction.type === 'delete' ? 'Delete Employee' : 'Restore Employee' }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ confirmAction.type === 'delete' 
            ? 'Are you sure you want to delete this employee? This action will deactivate their account.'
            : 'Are you sure you want to restore this employee? This will reactivate their account.' }}
        </p>
        <div class="flex justify-end space-x-3">
          <UiButton variant="secondary" @click="confirmAction = null">
            Cancel
          </UiButton>
          <UiButton 
            :variant="confirmAction.type === 'delete' ? 'danger' : 'primary'"
            @click="handleConfirm"
          >
            {{ confirmAction.type === 'delete' ? 'Delete' : 'Restore' }}
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

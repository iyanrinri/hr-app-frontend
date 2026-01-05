<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAllEmployees } from '@/composables/useEmployees'
import { useEmployeeLeaveBalances, useActiveLeavePeriod, useLeaveTypes } from '@/composables/useLeaves'
import { Search, Briefcase, Calendar, Plus, Edit } from 'lucide-vue-next'
import { format } from 'date-fns'
import type { LeaveBalance } from '@/types/leaves'
import AssignBalanceModal from '@/components/leaves/AssignBalanceModal.vue'

const selectedEmployeeId = ref('')
const searchQuery = ref('')
const isAssignModalOpen = ref(false)

const { data: employees } = useAllEmployees()
const { data: activePeriod } = useActiveLeavePeriod()
// Use computed for periodId to ensure reactivity
const periodId = computed(() => activePeriod.value?.id)
const { data: leaveTypes } = useLeaveTypes(periodId)

// Get balances for selected employee
const { data: balancesData, loading: isLoadingBalances, refresh: refreshBalances } = useEmployeeLeaveBalances(selectedEmployeeId)

// Normalize balances
const balances = computed(() => {
    // Check if undefined/null
    if (!balancesData.value) return []
    // If array, good
    if (Array.isArray(balancesData.value)) return balancesData.value
    // If inside { data: ... }
    return (balancesData.value as any).data || []
})

const filteredEmployees = computed(() => {
    if (!employees.value) return []
    const query = searchQuery.value.toLowerCase()
    return employees.value.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase()
        const position = emp.position?.toLowerCase() || ''
        return fullName.includes(query) || position.includes(query)
    })
})

const selectedEmployee = computed(() => 
    employees.value?.find(emp => String(emp.id) === selectedEmployeeId.value)
)

const onBalanceAssigned = () => {
    refreshBalances()
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Leave Administration
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Manage employee leave balances and quotas
          </p>
        </div>
      </div>

      <!-- Active Period Info -->
      <div v-if="activePeriod" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <Calendar class="w-5 h-5 text-blue-600" />
            <div>
              <p class="text-sm font-medium text-blue-900">
                Active Period: {{ activePeriod.name }}
              </p>
              <p class="text-xs text-blue-700">
                {{ format(new Date(activePeriod.startDate), 'MMM d, yyyy') }} - {{ format(new Date(activePeriod.endDate), 'MMM d, yyyy') }}
              </p>
            </div>
          </div>
      </div>

       <!-- Controls -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Employee Search -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Search Employee</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
                placeholder="Search by name or position..."
                v-model="searchQuery"
              />
            </div>
          </div>

          <!-- Employee Select -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Select Employee</label>
            <select
              class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
              v-model="selectedEmployeeId"
            >
              <option value="">-- Select Employee --</option>
              <option v-for="emp in filteredEmployees" :key="emp.id" :value="String(emp.id)">
                  {{ emp.firstName }} {{ emp.lastName }} ({{ emp.position }})
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div v-if="!selectedEmployeeId" class="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <Search class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500 text-lg">Select an employee to view their leave balances</p>
      </div>

      <div v-else class="space-y-6">
           <!-- Employee Info Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-white">
                  <span class="text-lg font-bold">
                    {{ selectedEmployee?.firstName.charAt(0) }}{{ selectedEmployee?.lastName.charAt(0) }}
                  </span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ selectedEmployee?.firstName }} {{ selectedEmployee?.lastName }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ selectedEmployee?.position }}</p>
                </div>
              </div>
              <UiButton @click="isAssignModalOpen = true">
                <Plus class="w-4 h-4 mr-2" />
                Assign Leave Balance
              </UiButton>
            </div>
          </div>

          <!-- Leave Balances -->
           <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
               <h3 class="text-lg font-medium leading-6 text-gray-900">Leave Balances</h3>
               <p class="mt-1 text-sm text-gray-500">Current leave quotas and usage</p>
             </div>

             <div v-if="isLoadingBalances" class="p-8 text-center">Loading balances...</div>
             <div v-else-if="!balances || balances.length === 0" class="p-8 text-center">
                 <Briefcase class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                 <p class="text-gray-500">No leave balances assigned yet</p>
                 <UiButton 
                   variant="ghost" 
                   @click="isAssignModalOpen = true"
                   class="mt-4"
                 >
                   Assign First Balance
                 </UiButton>
             </div>
             <div v-else class="overflow-x-auto">
                 <table class="min-w-full divide-y divide-gray-200">
                   <thead class="bg-gray-50">
                     <tr>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quota</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                       <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="balance in balances" :key="balance.id" class="hover:bg-gray-50">
                           <td class="px-6 py-4 whitespace-nowrap">
                             <div class="flex items-center">
                               <Briefcase class="w-5 h-5 text-gray-400 mr-3" />
                               <div class="text-sm font-medium text-gray-900">
                                 {{ balance.leaveTypeName }}
                               </div>
                             </div>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                             {{ balance.totalQuota }} days
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center gap-2">
                               <span class="text-sm text-gray-900">{{ balance.usedQuota }} days</span>
                               <div class="w-24 bg-gray-200 rounded-full h-2">
                                 <div
                                   :class="`h-2 rounded-full ${
                                     (balance.usedQuota / balance.totalQuota * 100) >= 90 ? 'bg-red-500' :
                                     (balance.usedQuota / balance.totalQuota * 100) >= 70 ? 'bg-yellow-500' :
                                     'bg-green-500'
                                   }`"
                                   :style="{ width: `${Math.min((balance.usedQuota / balance.totalQuota * 100), 100)}%` }"
                                 />
                               </div>
                             </div>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                              <span :class="`text-sm font-medium ${
                               balance.remainingQuota <= 0 ? 'text-red-600' :
                               balance.remainingQuota <= 3 ? 'text-yellow-600' :
                               'text-green-600'
                             }`">
                               {{ balance.remainingQuota }} days
                             </span>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             {{ format(new Date(balance.validFrom), 'MMM d, yy') }} - {{ format(new Date(balance.validTo), 'MMM d, yy') }}
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                               <span v-if="balance.isActive" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                               <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                             <UiButton variant="ghost" class="h-8 px-2">
                               <Edit class="w-4 h-4" />
                             </UiButton>
                           </td>
                      </tr>
                   </tbody>
                 </table>
             </div>
           </div>
      </div>

       <AssignBalanceModal 
         :isOpen="isAssignModalOpen"
         :employeeId="selectedEmployeeId"
         :employeeName="selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''"
         :leaveTypes="leaveTypes || []"
         @close="isAssignModalOpen = false"
         @assigned="onBalanceAssigned"
       />
    </div>
</template>

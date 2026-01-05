<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAllEmployees } from '@/composables/useEmployees'
import { useEmployeeOvertimeHistory, useEmployeeTotalHours } from '@/composables/useOvertime'
import OvertimeStatusBadge from '@/components/overtime/OvertimeStatusBadge.vue'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { Search, Clock, DollarSign, BarChart3, History } from 'lucide-vue-next'

const selectedEmployeeId = ref<string>('')
const activeTab = ref<'history' | 'total'>('history')

const startDate = ref(format(startOfMonth(new Date()), 'yyyy-MM-dd'))
const endDate = ref(format(endOfMonth(new Date()), 'yyyy-MM-dd'))

const { data: employees } = useAllEmployees()

// --- History ---
const historyFilters = computed(() => ({
    take: 50,
    startDate: activeTab.value === 'history' ? startDate.value : undefined,
    endDate: activeTab.value === 'history' ? endDate.value : undefined,
}))

const { data: historyData, loading: isLoadingHistory } = useEmployeeOvertimeHistory(selectedEmployeeId, historyFilters)

const historyRequests = computed(() => {
    if (!historyData.value) return []
    if (Array.isArray(historyData.value)) return historyData.value
     return historyData.value.requests || []
})

// --- Total Hours ---
const totalHoursFilters = computed(() => ({
    startDate: startDate.value,
    endDate: endDate.value,
    status: undefined 
}))

const { data: totalHoursData, loading: isLoadingTotal } = useEmployeeTotalHours(selectedEmployeeId, totalHoursFilters)

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(amount))
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Overtime Administration
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Monitor and report on employee overtime
          </p>
        </div>
      </div>

      <!-- Controls -->
      <UiCard>
        <UiCardContent class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div class="space-y-2">
                 <label class="text-sm font-medium text-gray-700">Select Employee</label>
                 <select 
                   class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
                   v-model="selectedEmployeeId"
                 >
                   <option value="">-- Select Employee --</option>
                   <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                     {{ emp.name || emp.firstName + ' ' + emp.lastName }} ({{ emp.position }})
                   </option>
                 </select>
               </div>
               
               <div class="space-y-2">
                 <label class="text-sm font-medium text-gray-700">Start Date</label>
                 <input 
                   type="date" 
                   class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                   v-model="startDate"
                 />
               </div>

               <div class="space-y-2">
                 <label class="text-sm font-medium text-gray-700">End Date</label>
                 <input 
                   type="date" 
                   class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                   v-model="endDate"
                 />
               </div>
            </div>
            
            <!-- Tabs -->
            <div class="flex border-b border-gray-200 mt-6 gap-8">
              <button
                @click="activeTab = 'history'"
                class="pb-3 text-sm font-medium transition-colors relative"
                :class="activeTab === 'history' ? 'text-brand-navy border-b-2 border-brand-navy' : 'text-gray-500 hover:text-gray-700'"
              >
                <span class="flex items-center gap-2">
                  <History class="w-4 h-4" /> Request History
                </span>
              </button>
              <button
                @click="activeTab = 'total'"
                class="pb-3 text-sm font-medium transition-colors relative"
                 :class="activeTab === 'total' ? 'text-brand-navy border-b-2 border-brand-navy' : 'text-gray-500 hover:text-gray-700'"
              >
               <span class="flex items-center gap-2">
                  <BarChart3 class="w-4 h-4" /> Total Hours Analysis
                </span>
              </button>
            </div>
        </UiCardContent>
      </UiCard>

      <!-- Content Area -->
      <div v-if="!selectedEmployeeId" class="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
           <Search class="w-12 h-12 text-gray-300 mx-auto mb-3" />
           <p class="text-gray-500 text-lg">Select an employee to view details</p>
      </div>

      <template v-else-if="activeTab === 'history'">
        <!-- History View -->
        <UiCard>
            <UiCardContent class="p-0 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                       <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                     <tr v-if="isLoadingHistory"><td colspan="5" class="px-6 py-4 text-center">Loading history...</td></tr>
                     <tr v-else-if="historyRequests.length === 0"><td colspan="5" class="px-6 py-8 text-center text-gray-500">No records found for this period.</td></tr>
                     <tr v-else v-for="req in historyRequests" :key="req.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {{ format(new Date(req.date), 'MMM d, yyyy') }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{{ req.reason }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ (req.totalMinutes / 60).toFixed(1) }} hrs</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {{ req.calculatedAmount ? formatCurrency(req.calculatedAmount) : '-' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                               <OvertimeStatusBadge :status="req.status" />
                            </td>
                     </tr>
                  </tbody>
                </table>
              </div>
            </UiCardContent>
        </UiCard>
      </template>

      <template v-else>
        <!-- Total Hours View -->
        <div class="space-y-6">
           <!-- Summary Cards -->
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                 <div class="flex items-center justify-between mb-4">
                    <h3 class="text-white/80 font-medium">Total Hours</h3>
                    <Clock class="w-8 h-8 text-white/40" />
                 </div>
                 <div class="text-4xl font-bold">
                    {{ isLoadingTotal ? '...' : totalHoursData?.totalHours.toFixed(1) }} hrs
                 </div>
                 <p class="text-white/60 text-sm mt-2">{{ totalHoursData?.totalMinutes }} minutes Total</p>
              </div>

              <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                 <div class="flex items-center justify-between mb-4">
                    <h3 class="text-white/80 font-medium">Total Compensation</h3>
                    <DollarSign class="w-8 h-8 text-white/40" />
                 </div>
                 <div class="text-4xl font-bold">
                    {{ isLoadingTotal ? '...' : totalHoursData?.totalAmount ? formatCurrency(totalHoursData.totalAmount) : 'Rp 0' }}
                 </div>
                 <p class="text-white/60 text-sm mt-2">Estimated Amount</p>
              </div>

              <UiCard class="p-6">
                 <h3 class="text-gray-500 font-medium mb-4">Request Status Breakdown</h3>
                 <div class="space-y-3">
                    <div class="flex justify-between items-center text-sm">
                       <span class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-green-500"></div> Approved</span>
                       <span class="font-medium text-gray-900">{{ totalHoursData?.requests?.filter(r => r.status === 'APPROVED').length || 0 }}</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                       <span class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-yellow-400"></div> Pending</span>
                       <span class="font-medium text-gray-900">{{ totalHoursData?.requests?.filter(r => r.status === 'PENDING').length || 0 }}</span>
                    </div>
                 </div>
              </UiCard>
           </div>
           
           <!-- Detailed List for Period -->
           <UiCard>
              <UiCardContent class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Detailed Breakdown</h3>
                  <div class="overflow-x-auto">
                     <table class="min-w-full text-sm">
                        <thead>
                           <tr class="border-b border-gray-100">
                              <th class="text-left py-2 font-medium text-gray-500">Date</th>
                              <th class="text-left py-2 font-medium text-gray-500">Hours</th>
                              <th class="text-right py-2 font-medium text-gray-500">Rate (Multiplier)</th>
                              <th class="text-right py-2 font-medium text-gray-500">Amount</th>
                           </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                           <tr v-for="req in totalHoursData?.requests" :key="req.id">
                                 <td class="py-3">{{ format(new Date(req.date), 'dd MMM yyyy') }}</td>
                                 <td class="py-3">{{ (req.totalMinutes / 60).toFixed(1) }}</td>
                                 <td class="py-3 text-right">{{ req.overtimeRate || '1.0' }}x</td>
                                 <td class="py-3 text-right">
                                    {{ req.calculatedAmount ? Number(req.calculatedAmount).toLocaleString('id-ID') : '-' }}
                                 </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
              </UiCardContent>
           </UiCard>
        </div>
      </template>

    </div>
</template>

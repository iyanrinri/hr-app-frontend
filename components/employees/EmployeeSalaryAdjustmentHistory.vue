<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, Calendar, DollarSign, Wallet, History, Award } from 'lucide-vue-next'
import { useEmployeeSalaryHistory, type Salary } from '@/composables/useSalaries'

const props = defineProps<{
  employeeId: string;
  currentBaseSalary?: number;
}>()

const { data: salaryHistory, loading } = useEmployeeSalaryHistory(props.employeeId)

const salaries = computed(() => salaryHistory.value || [])
const currentSalary = computed(() => salaries.value.find(s => s.isActive))
const historicalSalaries = computed(() => 
    salaries.value
        .filter(s => !s.isActive)
        .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())
)

const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const calculateTotalSalary = (baseSalary: string, allowances: string) => {
    return parseFloat(baseSalary) + parseFloat(allowances)
}

const calculateDifference = (newSalary: string, oldSalary: string) => {
    const diff = parseFloat(newSalary) - parseFloat(oldSalary)
    const percentage = (diff / parseFloat(oldSalary)) * 100
    return { amount: diff, percentage }
}
</script>

<template>
  <div class="space-y-6">
      
      <!-- Current Salary Card -->
      <div v-if="currentSalary" class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-white/80 text-sm font-medium mb-1">Current Base Salary</p>
              <p class="text-4xl font-bold">{{ formatCurrency(currentSalary.baseSalary) }}</p>
              <p v-if="parseFloat(currentSalary.allowances) > 0" class="text-white/90 text-sm mt-2">
                  + Allowances: {{ formatCurrency(currentSalary.allowances) }}
              </p>
              <p class="text-white text-lg font-semibold mt-2">
                Total: {{ formatCurrency(calculateTotalSalary(currentSalary.baseSalary, currentSalary.allowances)) }}
              </p>
            </div>
            <div class="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Wallet class="w-10 h-10 text-white" />
            </div>
          </div>
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2 text-white/80">
              <Calendar class="w-4 h-4" />
              <span>Effective since {{ formatDate(currentSalary.effectiveDate) }}</span>
            </div>
            <div v-if="currentSalary.grade" class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <Award class="w-4 h-4" />
                <span class="font-medium">{{ currentSalary.grade }}</span>
            </div>
          </div>
      </div>

      <!-- Salary History -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2">
                <History class="w-5 h-5" />
                Salary History
              </h3>
              <p class="mt-1 text-sm text-gray-500">Complete history of salary changes</p>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span>{{ salaries.length }} total records</span>
            </div>
          </div>
        </div>

        <div v-if="loading" class="p-12 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"></div>
            <p class="text-gray-500 mt-4">Loading salary history...</p>
        </div>

        <div v-else-if="salaries.length === 0" class="p-12 text-center">
            <DollarSign class="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p class="text-gray-500 text-lg">No salary records found</p>
            <p class="text-gray-400 text-sm mt-1">Salary history will appear here once created</p>
        </div>

        <div v-else class="p-6">
            <div class="space-y-4">
               <!-- Current Salary in Timeline -->
               <div v-if="currentSalary" class="relative pl-8 pb-8 border-l-2 border-green-400">
                  <div class="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                  <div class="bg-green-50 rounded-lg border-2 border-green-200 p-5">
                     <div class="flex items-start justify-between mb-3">
                       <div>
                         <div class="flex items-center gap-2 mb-2">
                           <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                             Current
                           </span>
                           <span v-if="currentSalary.grade" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                               {{ currentSalary.grade }}
                           </span>
                         </div>
                         <div class="flex items-center gap-2 text-sm text-gray-600">
                           <Calendar class="w-4 h-4" />
                           <span>Effective: {{ formatDate(currentSalary.effectiveDate) }}</span>
                         </div>
                       </div>
                     </div>

                     <div class="grid grid-cols-3 gap-4 mb-3">
                       <div class="bg-white rounded-lg p-3 border border-gray-200">
                         <p class="text-xs text-gray-500 mb-1">Base Salary</p>
                         <p class="font-semibold text-gray-900">{{ formatCurrency(currentSalary.baseSalary) }}</p>
                       </div>
                       <div class="bg-white rounded-lg p-3 border border-gray-200">
                         <p class="text-xs text-gray-500 mb-1">Allowances</p>
                         <p class="font-semibold text-gray-900">{{ formatCurrency(currentSalary.allowances) }}</p>
                       </div>
                       <div class="bg-white rounded-lg p-3 border border-green-200 bg-green-50">
                         <p class="text-xs text-gray-500 mb-1">Total</p>
                         <p class="font-bold text-green-600">
                           {{ formatCurrency(calculateTotalSalary(currentSalary.baseSalary, currentSalary.allowances)) }}
                         </p>
                       </div>
                     </div>

                     <div v-if="currentSalary.notes" class="bg-white rounded-lg p-3 border border-gray-200">
                        <p class="text-xs text-gray-500 mb-1">Notes</p>
                        <p class="text-sm text-gray-700">{{ currentSalary.notes }}</p>
                     </div>
                  </div>
               </div>

               <!-- Historical Salaries -->
               <div v-for="(salary, index) in historicalSalaries" :key="salary.id" class="relative pl-8 pb-8 border-l-2 border-gray-300 last:border-l-0 last:pb-0">
                    <div class="absolute left-[-9px] top-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow"></div>
                    <div class="bg-gray-50 rounded-lg border-2 border-gray-200 p-5">
                       <!-- We need logic to compare with next/previous salary to show diff/percentage -->
                       <!-- Simplified without complex diff for now to save time, or use computed property in loop if needed -->
                        <div class="flex items-start justify-between mb-3">
                           <div>
                              <div class="flex items-center gap-2 mb-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Historical
                                </span>
                                <span v-if="salary.grade" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {{ salary.grade }}
                                </span>
                              </div>
                              <div class="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar class="w-4 h-4" />
                                <span>
                                  {{ formatDate(salary.effectiveDate) }}
                                  {{ salary.endDate ? ` - ${formatDate(salary.endDate)}` : '' }}
                                </span>
                              </div>
                           </div>
                        </div>

                        <div class="grid grid-cols-3 gap-4 mb-3">
                             <div class="bg-white rounded-lg p-3 border border-gray-200">
                               <p class="text-xs text-gray-500 mb-1">Base Salary</p>
                               <p class="font-semibold text-gray-900">{{ formatCurrency(salary.baseSalary) }}</p>
                             </div>
                             <div class="bg-white rounded-lg p-3 border border-gray-200">
                               <p class="text-xs text-gray-500 mb-1">Allowances</p>
                               <p class="font-semibold text-gray-900">{{ formatCurrency(salary.allowances) }}</p>
                             </div>
                             <div class="bg-white rounded-lg p-3 border border-gray-200">
                               <p class="text-xs text-gray-500 mb-1">Total</p>
                               <p class="font-semibold text-gray-900">
                                 {{ formatCurrency(calculateTotalSalary(salary.baseSalary, salary.allowances)) }}
                               </p>
                             </div>
                        </div>

                         <div v-if="salary.notes" class="bg-white rounded-lg p-3 border border-gray-200">
                            <p class="text-xs text-gray-500 mb-1">Notes</p>
                            <p class="text-sm text-gray-700">{{ salary.notes }}</p>
                         </div>
                    </div>
               </div>
            </div>
        </div>
      </div>
  </div>
</template>

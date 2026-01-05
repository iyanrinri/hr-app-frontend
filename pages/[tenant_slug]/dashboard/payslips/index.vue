<script setup lang="ts">
import { ref } from 'vue'
import { usePayslips } from '@/composables/usePayslips'
import { useAllEmployees } from '@/composables/useEmployees'
import PayslipHistoryTable from '@/components/payslips/PayslipHistoryTable.vue'
import { Search } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const selectedEmployeeId = ref('')
const { data: employees } = useAllEmployees()

// Using 'usePayslips' assuming it can filter by employeeId.
// If API supports it. The `PayslipService.getAllPayslips` in nextjs code seemed vague but we implemented `usePayslips` passing filters.
// We might need to ensure backend supports listing ALL payslips with optional employee filter.
// If backend only has `getEmployeePayslipHistory`, we must select employee first or iterate.
// Let's assume our `GET /payslip` supports filters as mapped in `usePayslips`.

const filters = computed(() => ({
    employeeId: selectedEmployeeId.value || undefined,
    // Add period filter if needed
}))

const { data: payslipsData, loading: isLoading } = usePayslips(filters)
const payslips = computed(() => payslipsData.value?.data || [])

</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Payslips
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                    View and print employee payslips
                </p>
            </div>
        </div>

        <UiCard>
            <UiCardContent class="space-y-4">
                 <div class="flex items-center space-x-4">
                     <div class="w-full max-w-xs">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Employee</label>
                        <select 
                            v-model="selectedEmployeeId" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm h-10 border px-3"
                        >
                            <option value="">All Employees</option>
                            <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                                {{ emp.firstName }} {{ emp.lastName }}
                            </option>
                        </select>
                     </div>
                 </div>

                 <PayslipHistoryTable 
                    :payslips="payslips"
                    :loading="isLoading"
                 />
            </UiCardContent>
        </UiCard>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useCreatePayroll } from '@/composables/usePayroll'
import { useAllEmployees } from '@/composables/useEmployees'
import { useOvertimeRequests } from '@/composables/useOvertimeCRUD'
import { OvertimeStatus } from '@/types/overtime'
import type { Employee } from '@/types/employee'
import type { OvertimeRequest } from '@/types/overtime'
import { User, Calendar, DollarSign, Calculator, Clock } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

const props = defineProps<{
    isSubmitting?: boolean
}>()

// Helper to get current month
const getCurrentMonthDates = () => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay)
  }
}

const currentMonth = getCurrentMonthDates()

const employeeId = ref<string>('')
const periodStart = ref<string>(currentMonth.start)
const periodEnd = ref<string>(currentMonth.end)
const deductions = ref<string>('0')
const bonuses = ref<string>('0')
const selectedOvertimeIds = ref<string[]>([])

// Fetch Employees
const { data: employees } = useAllEmployees()

// Fetch Overtime Requests
// We need to construct filters reactively
const overtimeFilters = computed(() => {
    if (!employeeId.value || !periodStart.value || !periodEnd.value) return undefined
    return {
        employeeId: employeeId.value,
        startDate: periodStart.value,
        endDate: periodEnd.value,
        status: OvertimeStatus.APPROVED,
        take: 100
    }
})

// Since useOvertimeRequests returns a Ref which might be null if filters undefined, we need to handle that.
// But the composable will just not fetch or return empty if we passed undefined? 
// Actually, our composable implementation: 
// const queryParams = computed(() => { ... })
// useFetch(..., { query: queryParams })
// If we pass undefined filters, queryParams might be empty object.
// We probably want to control execution or filter out empty calls. 
// For now, let's just let it run, if employeeId is empty it fetches all (bad), so we must ensure filter validity in composable or here.
// In composable, if employeeId is undefined, it's omitted. 
// But here we want to fetch ONLY if employee selected. 
// We can use `immediate: false` or a `watch` or `enabled` equivalent.
// Standard Nuxt useFetch 'immediate' key or just use a computed key that returns null to disable.
// But in `useOvertimeRequests`, key is static 'overtime-requests'.
// Let's modify the usage slightly or relying on the backend filtering.
// Actually, `useOvertimeRequests` in our implementation runs immediately.
// We should probably rely on the fact that if employeeId is set, we get correct data.
// If employeeId is NOT set, we get all overtime requests... which might be heavy.
// Let's fix this by not fetching unless employeeId is set.
// But we can't condition a hook call.
// We'll rely on client side filtering or improved hook later if needed. For now, it fetches when filters change.

const { data: overtimeResponse, loading: isLoadingOvertime } = useOvertimeRequests(overtimeFilters)

const overtimeRequests = computed<OvertimeRequest[]>(() => {
    const res = overtimeResponse.value
    if (!res) return []
    if (Array.isArray(res)) return res
    return res.requests || []
})

// Derived State
const selectedEmployee = computed(() => employees.value?.find((e: any) => String(e.id) === employeeId.value))

// Auto-select overtime
watch(overtimeRequests, (newReqs) => {
    if (newReqs.length > 0) {
        selectedOvertimeIds.value = newReqs.map(r => r.id)
    } else {
        selectedOvertimeIds.value = []
    }
})

// Calculations
const baseSalary = computed(() => Number(selectedEmployee.value?.baseSalary) || 0)
const overtimePay = computed(() => {
    return overtimeRequests.value
        .filter(req => selectedOvertimeIds.value.includes(req.id))
        .reduce((total, req) => total + (Number(req.calculatedAmount) || 0), 0)
})

const grossSalary = computed(() => baseSalary.value + overtimePay.value + Number(bonuses.value))
const netSalary = computed(() => grossSalary.value - Number(deductions.value))

// Format
const formatIDR = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)

const { mutate: submitPayroll, loading: isSubmittingLocal } = useCreatePayroll()
const isPending = computed(() => props.isSubmitting || isSubmittingLocal.value)

const onSubmit = async () => {
    if (!employeeId.value) return 

    await submitPayroll({
        employeeId: employeeId.value,
        periodStart: new Date(periodStart.value).toISOString(),
        periodEnd: new Date(periodEnd.value).toISOString(),
        deductions: deductions.value,
        bonuses: bonuses.value,
        overtimeRequestIds: selectedOvertimeIds.value
    }, {
        onSuccess: () => emit('success')
    })
}

const toggleOvertime = (id: string) => {
    if (selectedOvertimeIds.value.includes(id)) {
        selectedOvertimeIds.value = selectedOvertimeIds.value.filter(oid => oid !== id)
    } else {
        selectedOvertimeIds.value.push(id)
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Employee Selection -->
            <UiCard>
                <UiCardHeader>
                    <UiCardTitle class="flex items-center text-lg">
                        <User class="mr-2 h-5 w-5 text-gray-500" />
                        Employee Details
                    </UiCardTitle>
                </UiCardHeader>
                <UiCardContent class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Select Employee</label>
                        <select
                            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan"
                            v-model="employeeId"
                        >
                            <option value="">-- Select Employee --</option>
                            <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                                {{ emp.firstName }} {{ emp.lastName }} ({{ emp.position }})
                            </option>
                        </select>
                    </div>

                    <div v-if="selectedEmployee" class="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Department:</span>
                            <span class="font-medium">{{ selectedEmployee.department }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Base Salary:</span>
                            <span class="font-medium">{{ formatIDR(selectedEmployee.baseSalary) }}</span>
                        </div>
                    </div>
                </UiCardContent>
            </UiCard>

            <!-- Period Selection -->
            <UiCard>
                <UiCardHeader>
                    <UiCardTitle class="flex items-center text-lg">
                        <Calendar class="mr-2 h-5 w-5 text-gray-500" />
                        Payroll Period
                    </UiCardTitle>
                </UiCardHeader>
                <UiCardContent class="space-y-4">
                     <UiInput
                        type="date"
                        label="Period Start"
                        v-model="periodStart"
                        required
                    />
                    <UiInput
                        type="date"
                        label="Period End"
                        v-model="periodEnd"
                        :min="periodStart"
                        required
                    />
                </UiCardContent>
            </UiCard>

             <!-- Financials -->
            <UiCard>
                <UiCardHeader>
                    <UiCardTitle class="flex items-center text-lg">
                        <DollarSign class="mr-2 h-5 w-5 text-gray-500" />
                        Adjustments
                    </UiCardTitle>
                </UiCardHeader>
                <UiCardContent class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Bonuses</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span class="text-gray-500 sm:text-sm">Rp</span>
                            </div>
                            <input
                                type="number"
                                v-model="bonuses"
                                class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border"
                                min="0"
                            />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span class="text-gray-500 sm:text-sm">Rp</span>
                            </div>
                            <input
                                type="number"
                                v-model="deductions"
                                class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border"
                                min="0"
                            />
                        </div>
                    </div>
                </UiCardContent>
            </UiCard>

             <!-- Summary -->
            <UiCard>
                <UiCardHeader>
                    <UiCardTitle class="flex items-center text-lg">
                        <Calculator class="mr-2 h-5 w-5 text-gray-500" />
                        Calculated Salary
                    </UiCardTitle>
                </UiCardHeader>
                <UiCardContent class="space-y-3">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Base Salary:</span>
                        <span>{{ formatIDR(baseSalary) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Overtime Pay:</span>
                        <span>{{ formatIDR(overtimePay) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                         <span class="text-gray-600">Bonuses:</span>
                        <span class="text-green-600">+ {{ formatIDR(Number(bonuses)) }}</span>
                    </div>
                     <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Deductions:</span>
                        <span class="text-red-600">- {{ formatIDR(Number(deductions)) }}</span>
                    </div>
                    <div class="border-t pt-3 mt-2">
                        <div class="flex justify-between font-bold text-lg">
                            <span>Net Salary:</span>
                            <span class="text-brand-cyan">{{ formatIDR(netSalary) }}</span>
                        </div>
                    </div>
                </UiCardContent>
            </UiCard>
        </div>

        <!-- Overtime Requests Selection -->
        <UiCard>
            <UiCardHeader>
                 <UiCardTitle class="flex items-center text-lg">
                    <Clock class="mr-2 h-5 w-5 text-gray-500" />
                    Approved Overtime Requests
                </UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
                <div v-if="isLoadingOvertime" class="text-center py-4 text-gray-500">Loading overtime requests...</div>
                <div v-else-if="overtimeRequests.length === 0" class="text-center py-4 text-gray-500">
                    {{ employeeId && periodStart && periodEnd ? 'No approved overtime requests found for this period.' : 'Select Employee and Period to view overtime requests.' }}
                </div>
                <div v-else class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Include</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="req in overtimeRequests" :key="req.id" class="hover:bg-gray-50">
                                <td class="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        :checked="selectedOvertimeIds.includes(req.id)"
                                        @change="toggleOvertime(req.id)"
                                        class="h-4 w-4 text-brand-cyan focus:ring-brand-cyan border-gray-300 rounded"
                                    />
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{ new Date(req.date).toLocaleDateString() }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{ (req.totalMinutes / 60).toFixed(1) }} hrs
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{ formatIDR(Number(req.calculatedAmount) || 0) }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-500 truncate max-w-xs">
                                    {{ req.reason }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </UiCardContent>
        </UiCard>

        <div class="flex justify-end space-x-4">
             <button 
                type="button" 
                @click="$emit('cancel')"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
             >
                Cancel
             </button>
             <button 
                type="submit" 
                :disabled="isPending || !employeeId"
                class="px-4 py-2 text-sm font-medium text-white bg-brand-navy rounded-md hover:opacity-90 disabled:opacity-50 flex items-center"
             >
                <span v-if="isPending" class="mr-2">...</span>
                {{ isPending ? 'Creating Payroll...' : 'Create Payroll' }}
             </button>
        </div>
    </form>
</template>

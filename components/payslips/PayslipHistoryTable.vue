<script setup lang="ts">
import { ref } from 'vue'
import { Eye } from 'lucide-vue-next'
import type { Payslip } from '@/types/payslip'

const props = defineProps<{
  payslips: Payslip[]
  loading?: boolean
}>()

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string

const formatIDR = (val: string | number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(val))
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}

const formatShortDate = (date: string) => {
    return new Date(date).toLocaleDateString()
}
</script>

<template>
    <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="h-16 bg-gray-100 rounded-md animate-pulse" />
    </div>

    <div v-else-if="payslips.length === 0" class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        No payslip records found.
    </div>

    <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Period / Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gross Salary
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Additions
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deductions
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Take Home Pay
                    </th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="payslip in payslips" :key="payslip.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">
                            {{ payslip.payroll?.periodStart ? formatDate(payslip.payroll.periodStart) : 'N/A' }}
                        </div>
                        <div class="text-xs text-gray-500">
                            Gen: {{ formatShortDate(payslip.generatedAt) }}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <template v-if="payslip.payroll?.employee">
                            <div class="text-sm font-medium text-gray-900">
                                {{ payslip.payroll.employee.firstName }} {{ payslip.payroll.employee.lastName }}
                            </div>
                            <div class="text-xs text-gray-500">
                                {{ payslip.payroll.employee.position }}
                            </div>
                        </template>
                        <div v-else class="text-sm text-gray-500">-</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {{ formatIDR(payslip.grossSalary) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                        +{{ formatIDR(parseFloat(payslip.overtimePay || '0') + parseFloat(payslip.bonuses || '0') + parseFloat(payslip.allowances || '0')) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                        -{{ formatIDR(payslip.totalDeductions || (parseFloat(payslip.taxAmount || '0') + parseFloat(payslip.bpjsKesehatanEmployee || '0') + parseFloat(payslip.bpjsKetenagakerjaanEmployee || '0') + parseFloat(payslip.otherDeductions || '0'))) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-brand-navy">
                        {{ formatIDR(payslip.takeHomePay) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <NuxtLink :to="`/${tenantSlug}/dashboard/payslips/${payslip.id}`">
                            <button class="text-gray-500 hover:text-brand-navy p-2" title="View Detail">
                                <Eye class="w-4 h-4" />
                            </button>
                        </NuxtLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

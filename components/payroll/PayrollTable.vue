<script setup lang="ts">
import { ref, watch } from 'vue'
import { PayrollStatus } from '@/types/payroll'
import type { Payroll } from '@/types/payroll'
import { useGeneratePayslip, usePayslipByPayroll } from '@/composables/usePayslips'
import PayrollStatusBadge from './PayrollStatusBadge.vue'
import { Eye, CheckCircle, DollarSign, Trash2, Calendar, FileText } from 'lucide-vue-next'

const props = defineProps<{
  payrolls: Payroll[]
  isLoading?: boolean
  isAdmin?: boolean
}>()

const emit = defineEmits<{
  (e: 'process', id: string): void
  (e: 'markPaid', id: string): void
  (e: 'delete', id: string): void
  (e: 'generatePayslip', id: string): void
}>()

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

// Track payslip status
const payslipStatus = ref<Record<string, 'loading' | 'exists' | 'not_exists'>>({})

// We need a helper to check payslip existence. 
// In Next.js this was `PayslipService.getPayslipByPayrollId`.
// We can use our composable `usePayslipByPayroll` but that hook is designed for one-off reactive use.
// Here we need to check FOR EACH paid payroll. 
// Using `useFetch` in a loop inside `setup` is bad. 
// We should use `$fetch` directly or a specific service method if available. 
// Since `usePayslipByPayroll` uses `useFetch`, let's just use `$fetch` here with our URL builder.

const useTenantUrl = () => {
    const route = useRoute() 
    const tenantSlug = route.params.tenant_slug as string
    return (path: string) => tenantSlug ? `/api/${tenantSlug}${path}` : `/api${path}`
}
const getUrl = useTenantUrl()

const checkPayslips = async () => {
    const paidPayrolls = props.payrolls.filter(p => {
        const actualStatus = p.status || 
          (p.isPaid ? PayrollStatus.PAID : 
           p.processedAt ? PayrollStatus.PROCESSED : 
           PayrollStatus.PENDING)
        return actualStatus === PayrollStatus.PAID
    })

    for (const payroll of paidPayrolls) {
        if (payslipStatus.value[payroll.id]) continue
        
        payslipStatus.value[payroll.id] = 'loading'
        try {
            await $fetch(getUrl(`/payslip/by-payroll/${payroll.id}`))
            payslipStatus.value[payroll.id] = 'exists'
        } catch (error: any) {
             payslipStatus.value[payroll.id] = 'not_exists'
        }
    }
}

watch(() => props.payrolls, (newVal) => {
    if(newVal.length > 0) checkPayslips()
}, { immediate: true })

</script>

<template>
    <div v-if="isLoading">
      <div class="w-full bg-white rounded-lg shadow p-6">
        <div class="animate-pulse space-y-4">
          <div v-for="i in 5" :key="i" class="h-12 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="payrolls.length === 0">
      <div class="w-full bg-white rounded-lg shadow p-12 text-center text-gray-500">
        No payroll records found.
      </div>
    </div>

    <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Period
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Base Salary
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gross Salary
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Net Salary
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payroll in payrolls" :key="payroll.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                   <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      {{ payroll.employee?.firstName }} {{ payroll.employee?.lastName }}
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">{{ payroll.employee?.position }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center text-sm text-gray-500">
                    <Calendar class="mr-1.5 h-4 w-4" />
                    {{ new Date(payroll.periodStart).toLocaleDateString() }} - {{ new Date(payroll.periodEnd).toLocaleDateString() }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(Number(payroll.baseSalary)) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(Number(payroll.grossSalary)) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ formatCurrency(Number(payroll.netSalary)) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                   <PayrollStatusBadge :status="payroll.status || (payroll.isPaid ? 'PAID' : payroll.processedAt ? 'PROCESSED' : 'PENDING')" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <NuxtLink :to="`/${tenantSlug}/dashboard/payroll/${payroll.id}`">
                      <button class="p-2 text-gray-500 hover:bg-gray-100 rounded" title="View Details">
                        <Eye class="w-4 h-4" />
                      </button>
                    </NuxtLink>
                    
                    <template v-if="isAdmin">
                        <button 
                            v-if="(payroll.status === PayrollStatus.PENDING || (!payroll.status && !payroll.processedAt))"
                            class="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                            @click="$emit('process', payroll.id)"
                            title="Process Payroll"
                        >
                            <CheckCircle class="w-4 h-4" />
                        </button>
                        
                        <button 
                            v-if="(payroll.status === PayrollStatus.PROCESSED || (payroll.processedAt && !payroll.isPaid))"
                            class="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                            @click="$emit('markPaid', payroll.id)"
                            title="Mark as Paid"
                        >
                            <DollarSign class="w-4 h-4" />
                        </button>

                        <button 
                            v-if="payroll.status !== PayrollStatus.PAID && !payroll.isPaid"
                            class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                            @click="$emit('delete', payroll.id)"
                            title="Delete"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                        
                        <!-- Generate Payslip button for PAID payrolls -->
                         <template v-if="payroll.status === PayrollStatus.PAID || payroll.isPaid">
                            <button 
                                v-if="payslipStatus[payroll.id] === 'not_exists'"
                                class="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded"
                                @click="$emit('generatePayslip', payroll.id)"
                                title="Generate Payslip"
                            >
                                <FileText class="w-4 h-4" />
                            </button>
                            
                            <NuxtLink 
                                v-if="payslipStatus[payroll.id] === 'exists'"
                                :to="`/${tenantSlug}/dashboard/payslips?payrollId=${payroll.id}`"
                            >
                                <button 
                                  class="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                                  title="View Payslip"
                                >
                                  <FileText class="w-4 h-4" />
                                </button>
                            </NuxtLink>
                            
                            <button 
                                v-if="payslipStatus[payroll.id] === 'loading'"
                                class="p-2 opacity-50 cursor-not-allowed rounded"
                                disabled
                                title="Checking payslip..."
                            >
                                <FileText class="w-4 h-4 animate-pulse" />
                            </button>
                        </template>
                    </template>
                  </div>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>

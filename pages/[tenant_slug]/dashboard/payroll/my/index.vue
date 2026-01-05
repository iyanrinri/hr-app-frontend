<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useMyPayrolls } from '@/composables/usePayroll'
import { useEmployeeProfile } from '@/composables/useEmployeeProfile' // Assuming this exists or similar
import { Wallet, TrendingUp, Calendar } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const { data: payrolls, loading: isLoadingHistory } = useMyPayrolls()
// Assuming we have a way to get full profile or we use user store if it has salary info.
// Usually sensitive info like Base Salary is in profile.
// Let's assume user object in store has it or we fetch it.
// If not available, we just show history.

const formatIDR = (val: string | number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(val))
}
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    My Salary
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                    Overview of your compensation and payment history
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <UiCard>
                <UiCardContent class="p-5 flex items-center">
                    <div class="flex-shrink-0">
                        <Wallet class="h-6 w-6 text-gray-400" />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">Base Salary</dt>
                            <dd>
                                <div class="text-lg font-medium text-gray-900">
                                    {{ user?.baseSalary ? formatIDR(user.baseSalary) : 'Confidential' }}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </UiCardContent>
            </UiCard>
             <!-- Add more cards if data available -->
        </div>

        <UiCard>
            <UiCardHeader>
                <UiCardTitle>Recent Payments</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
                <div v-if="isLoadingHistory" class="text-center py-4">Loading...</div>
                <div v-else-if="!payrolls || payrolls.data.length === 0" class="text-center py-4 text-gray-500">No payment history found.</div>
                <div v-else class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="payroll in payrolls.data" :key="payroll.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ new Date(payroll.periodStart).toLocaleDateString() }} - {{ new Date(payroll.periodEnd).toLocaleDateString() }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-brand-navy">
                                    {{ formatIDR(payroll.netSalary) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {{ payroll.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <NuxtLink :to="`/dashboard/payslips/${payroll.id}`" class="text-brand-navy hover:text-blue-900">
                                        View Slip
                                    </NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </UiCardContent>
        </UiCard>
    </div>
</template>

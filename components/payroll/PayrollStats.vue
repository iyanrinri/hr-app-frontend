<script setup lang="ts">
import { computed } from 'vue'
import { Wallet, Banknote, Clock, TrendingDown, CheckCircle } from 'lucide-vue-next'
import type { PayrollSummary } from '@/types/payroll'

const props = defineProps<{
  summary?: PayrollSummary | null
  loading?: boolean
}>()

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

const items = computed(() => {
    const s = props.summary
    if (!s) return []

    return [
        {
            label: 'Total Payrolls',
            value: s.totalPayrolls.toString(),
            icon: Wallet,
            color: 'bg-indigo-100 text-indigo-600',
            isCurrency: false
        },
        {
            label: 'Base Salary',
            value: formatCurrency(Number(s.totalBaseSalary)),
            icon: Banknote,
            color: 'bg-blue-100 text-blue-600',
            isCurrency: true
        },
        {
            label: 'Overtime',
            value: formatCurrency(Number(s.totalOvertimePay)),
            icon: Clock,
            color: 'bg-yellow-100 text-yellow-600',
            isCurrency: true
        },
        {
            label: 'Deductions',
            value: formatCurrency(Number(s.totalDeductions)),
            icon: TrendingDown,
            color: 'bg-red-100 text-red-600',
            isCurrency: true
        },
        {
            label: 'Net Salary',
            value: formatCurrency(Number(s.totalNetSalary)),
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600',
            isCurrency: true
        }
    ]
})
</script>

<template>
  <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
    <div v-for="i in 5" :key="i" class="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
  </div>
  
  <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
    <div v-for="(item, index) in items" :key="index" class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-col space-y-2">
            <div class="flex items-center justify-between">
                <div :class="['p-2 rounded-lg', item.color]">
                    <component :is="item.icon" class="h-4 w-4" />
                </div>
            </div>
            <div>
                <p class="text-xs font-medium text-gray-500 mb-1 truncate">{{ item.label }}</p>
                <p :class="['font-bold text-gray-900 truncate', item.isCurrency ? 'text-sm' : 'text-xl']">
                    {{ item.value }}
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

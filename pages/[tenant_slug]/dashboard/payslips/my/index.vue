<script setup lang="ts">
import { useMyPayslips } from '@/composables/usePayslips'
import PayslipHistoryTable from '@/components/payslips/PayslipHistoryTable.vue'

definePageMeta({
  layout: 'dashboard'
})

const { data: payslips, loading: isLoading } = useMyPayslips()

// useMyPayslips returns array of Payslip directly based on service
const payslipList = computed(() => payslips.value || [])

</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    My Payslips
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                    Your salary slip history
                </p>
            </div>
        </div>

        <UiCard>
            <UiCardContent>
                 <PayslipHistoryTable 
                    :payslips="payslipList"
                    :loading="isLoading"
                 />
            </UiCardContent>
        </UiCard>
    </div>
</template>

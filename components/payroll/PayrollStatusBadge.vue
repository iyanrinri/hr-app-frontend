<script setup lang="ts">
import { PayrollStatus } from '@/types/payroll'

defineProps<{
  status: PayrollStatus | string
}>()

const getStatusColor = (status: string) => {
    switch (status) {
      case PayrollStatus.PAID:
        return 'bg-green-100 text-green-800 border-green-200';
      case PayrollStatus.PROCESSED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case PayrollStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
}

const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ')
}
</script>

<template>
    <span
      :class="['px-2.5 py-0.5 rounded-full text-xs font-medium border', getStatusColor(status)]"
    >
      {{ formatStatus(status) }}
    </span>
</template>

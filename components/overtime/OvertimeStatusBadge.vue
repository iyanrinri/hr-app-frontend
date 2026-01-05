<script setup lang="ts">
import { OvertimeStatus } from '@/types/overtime'
import { CheckCircle2, Clock, XCircle } from 'lucide-vue-next'

defineProps<{
  status: OvertimeStatus
  managerApprovedAt?: string
  hrApprovedAt?: string
}>()
</script>

<template>
  <div v-if="status === OvertimeStatus.APPROVED || status === OvertimeStatus.HR_APPROVED" class="flex flex-col gap-1">
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
      <CheckCircle2 class="w-3 h-3 mr-1" />
      Approved
    </span>
  </div>

  <div v-else-if="status === OvertimeStatus.MANAGER_APPROVED" class="flex flex-col gap-1">
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
      <CheckCircle2 class="w-3 h-3 mr-1" />
      Manager Approved
    </span>
    <span class="text-[10px] text-gray-500 leading-tight">Waiting for HR</span>
  </div>

  <div v-else-if="status === OvertimeStatus.PENDING" class="flex flex-col gap-1">
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
      <Clock class="w-3 h-3 mr-1" />
      Pending
    </span>
  </div>

  <span v-else-if="status === OvertimeStatus.REJECTED" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
    <XCircle class="w-3 h-3 mr-1" />
    Rejected
  </span>

  <span v-else class="text-gray-500 text-xs">{{ status }}</span>
</template>

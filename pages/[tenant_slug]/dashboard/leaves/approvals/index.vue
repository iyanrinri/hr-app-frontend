<script setup lang="ts">
import { computed } from 'vue'
import { usePendingApprovals, useApproveLeaveRequest, useRejectLeaveRequest } from '@/composables/useLeaves'
import { Check, X } from 'lucide-vue-next'
import { format } from 'date-fns'
import type { LeaveRequest } from '@/types/leaves'

const { data: approvalsData, loading, refresh } = usePendingApprovals()
const { mutate: approve } = useApproveLeaveRequest()
const { mutate: reject } = useRejectLeaveRequest()

const requests = computed<LeaveRequest[]>(() => {
     if (!approvalsData.value) return []
     if (Array.isArray(approvalsData.value)) return approvalsData.value
     return (approvalsData.value as any).data || []
})

const handleApprove = async (id: string) => {
    await approve(id)
    refresh()
}

const handleReject = async (id: string) => {
    const reason = prompt('Please enter a rejection reason:')
    if (reason !== null) {
        await reject(id, reason)
        refresh()
    }
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Leave Approvals</h2>
           <p className="text-sm text-gray-500">Review and action pending leave requests.</p>
        </div>
      </div>

      <UiCard>
        <UiCardHeader><UiCardTitle>Pending Requests</UiCardTitle></UiCardHeader>
        <UiCardContent>
          <div class="overflow-x-auto">
             <div v-if="loading" class="text-center py-8">
                 <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"></div>
             </div>
             <table v-else class="w-full text-sm text-left">
               <thead class="bg-gray-50 border-b">
                 <tr>
                   <th class="px-4 py-3 font-medium text-gray-500">Employee</th>
                   <th class="px-4 py-3 font-medium text-gray-500">Type</th>
                   <th class="px-4 py-3 font-medium text-gray-500">Dates</th>
                   <th class="px-4 py-3 font-medium text-gray-500">Days</th>
                   <th class="px-4 py-3 font-medium text-gray-500">Reason</th>
                   <th class="px-4 py-3 font-medium text-right text-gray-500">Actions</th>
                 </tr>
               </thead>
               <tbody class="divide-y">
                 <tr v-if="requests.length === 0">
                    <td colspan="6" class="p-4 text-center text-gray-500 italic">No pending approvals.</td>
                 </tr>
                 <tr v-else v-for="req in requests" :key="req.id" class="hover:bg-gray-50">
                       <td class="px-4 py-3 font-medium text-gray-900">{{ req.employeeName || 'Unknown' }}</td>
                       <td class="px-4 py-3 text-gray-600">{{ req.leaveTypeName }}</td>
                       <td class="px-4 py-3 text-gray-600">
                         {{ format(new Date(req.startDate), 'MMM dd') }} - {{ format(new Date(req.endDate), 'MMM dd, yyyy') }}
                       </td>
                       <td class="px-4 py-3">{{ req.totalDays }}</td>
                       <td class="px-4 py-3 truncate max-w-[200px]">{{ req.reason }}</td>
                       <td class="px-4 py-3 text-right space-x-2">
                         <div class="flex justify-end gap-2">
                           <UiButton 
                             class="bg-green-600 hover:bg-green-700 text-white py-1 px-3 text-xs h-auto"
                             @click="handleApprove(req.id)"
                           >
                             <Check class="w-4 h-4 mr-1" /> Approve
                           </UiButton>
                           <UiButton 
                             variant="destructive"
                             class="py-1 px-3 text-xs h-auto"
                             @click="handleReject(req.id)"
                           >
                             <X class="w-4 h-4 mr-1" /> Reject
                           </UiButton>
                         </div>
                       </td>
                 </tr>
               </tbody>
             </table>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
</template>

<script setup lang="ts">
import { usePendingOvertimeApprovals, useProcessOvertimeApproval } from '@/composables/useOvertime'
import OvertimeStatusBadge from '@/components/overtime/OvertimeStatusBadge.vue'
import { format } from 'date-fns'
import { CheckCircle2, XCircle, Clock, User } from 'lucide-vue-next'
import { OvertimeStatus, ApproverType, ApprovalStatus } from '@/types/overtime'

const { data: requests, loading: isLoading, refresh } = usePendingOvertimeApprovals()
const { mutate: processApproval } = useProcessOvertimeApproval()

const handleApprove = async (id: string, currentStatus: OvertimeStatus) => {
    let approverType = ApproverType.MANAGER
    if (currentStatus === OvertimeStatus.MANAGER_APPROVED) {
        approverType = ApproverType.HR
    }

    const comments = prompt("Optional: Add approval comments")
    if (comments !== null) {
        await processApproval({
            requestId: id,
            status: ApprovalStatus.APPROVED,
            approverType,
            comments
        })
        refresh()
    }
}

const handleReject = async (id: string, currentStatus: OvertimeStatus) => {
    let approverType = ApproverType.MANAGER
    if (currentStatus === OvertimeStatus.MANAGER_APPROVED) {
        approverType = ApproverType.HR
    }

    const reason = prompt("Please provide a reason for rejection (Required)")
    if (reason) {
        await processApproval({
            requestId: id,
            status: ApprovalStatus.REJECTED,
            approverType,
            rejectionReason: reason
        })
        refresh()
    } else if (reason === '') {
        alert("Rejection reason is required")
    }
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Pending Approvals
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Review and manage overtime requests requiring your approval
          </p>
        </div>
      </div>

      <UiCard>
        <UiCardContent class="p-0 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason & Time
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="isLoading">
                    <tr v-for="i in 3" :key="i">
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"></td>
                    </tr>
                </template>
                <template v-else-if="!requests || requests.length === 0">
                    <tr>
                      <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center justify-center">
                          <Clock class="w-12 h-12 text-gray-300 mb-3" />
                          <p class="text-lg font-medium text-gray-900">No pending approvals</p>
                          <p class="text-sm text-gray-500 mt-1">You're all caught up!</p>
                        </div>
                      </td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="request in requests" :key="request.id" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                         <div class="flex items-center">
                            <div class="h-8 w-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mr-3">
                               <User class="w-4 h-4" />
                            </div>
                            <div>
                              <div class="text-sm font-medium text-gray-900">
                                {{ request.employee?.name || `Emp #${request.employeeId}` }}
                              </div>
                              <div class="text-xs text-gray-500">
                                {{ request.employee?.email }}
                              </div>
                            </div>
                         </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ format(new Date(request.date), 'MMM d, yyyy') }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-900 truncate max-w-xs" :title="request.reason">
                           {{ request.reason }}
                        </div>
                        <div class="text-xs text-gray-500 mt-0.5">
                          {{ format(new Date(request.startTime), 'HH:mm') }} - {{ format(new Date(request.endTime), 'HH:mm') }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ (request.totalMinutes / 60).toFixed(1) }} hrs
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <OvertimeStatusBadge 
                          :status="request.status" 
                          :managerApprovedAt="request.managerApprovedAt"
                          :hrApprovedAt="request.hrApprovedAt"
                        />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex justify-end gap-2">
                           <button 
                             @click="handleApprove(request.id, request.status)"
                             class="p-1 rounded-full text-green-600 hover:bg-green-50 transition-colors"
                             title="Approve"
                           >
                             <CheckCircle2 class="w-5 h-5" />
                           </button>
                           <button 
                             @click="handleReject(request.id, request.status)"
                             class="p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                             title="Reject"
                           >
                             <XCircle class="w-5 h-5" />
                           </button>
                        </div>
                      </td>
                    </tr>
                </template>
              </tbody>
            </table>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
</template>

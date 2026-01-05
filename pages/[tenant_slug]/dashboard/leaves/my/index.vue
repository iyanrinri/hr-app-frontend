<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMyLeaveBalances, useMyLeaveRequests, useCancelLeaveRequest } from '@/composables/useLeaves'
import { Plus, X, Calendar, Clock, AlertCircle, CheckCircle2, XCircle, Briefcase, ChevronRight } from 'lucide-vue-next'
import { format, formatDistanceToNow } from 'date-fns'
import type { LeaveRequest, LeaveBalance } from '@/types/leaves'
import { LeaveRequestStatus } from '@/types/leaves'
import LeaveRequestForm from '@/components/leaves/LeaveRequestForm.vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const { data: balances, loading: isLoadingBalances } = useMyLeaveBalances()
const { data: requestsData, loading: isLoadingRequests, refresh: refreshRequests } = useMyLeaveRequests({ page: 1, limit: 50 })
const { mutate: cancelRequest } = useCancelLeaveRequest()

const isModalOpen = ref(false)
const requests = computed(() => {
    const data = requestsData.value
    if (!data) return []
    if (Array.isArray(data)) return data
    return data.data || []
})

const handleCancel = async (id: string) => {
    if (confirm('Are you sure you want to cancel this request?')) {
        await cancelRequest(id)
        refreshRequests()
    }
}

const onFormSuccess = () => {
    isModalOpen.value = false
    refreshRequests()
}

const gradients = [
    'from-blue-500 to-cyan-400',
    'from-emerald-500 to-teal-400',
    'from-violet-500 to-purple-400',
    'from-orange-500 to-amber-400',
]

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Leave Management
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            View your balances and track your leave requests
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <UiButton @click="isModalOpen = true" class="shadow-lg shadow-brand-navy/20">
            <Plus class="w-4 h-4 mr-2" />
            New Request
          </UiButton>
        </div>
      </div>

      <!-- Balances Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-if="isLoadingBalances">
           <div v-for="i in 3" :key="i" class="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
        </template>
        <template v-else-if="!balances || balances.length === 0">
           <div class="col-span-full bg-white rounded-xl shadow-sm p-8 text-center border border-dashed border-gray-300">
             <Briefcase class="w-12 h-12 text-gray-400 mx-auto mb-3" />
             <h3 class="text-lg font-medium text-gray-900">No Leave Balances</h3>
             <p class="text-gray-500 mt-1">You don't have any assigned leave quotas yet.</p>
           </div>
        </template>
        <template v-else>
           <div 
              v-for="(balance, idx) in balances" 
              :key="balance.id" 
              :class="`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${gradients[idx % gradients.length]}`"
            >
              <div class="px-6 py-6 text-white relative z-10">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-white/80 text-sm font-medium mb-1">Leave Type</p>
                    <h3 class="text-2xl font-bold tracking-tight">{{ balance.leaveTypeName }}</h3>
                  </div>
                  <div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Briefcase class="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div class="mt-8 flex items-end justify-between">
                  <div>
                    <p class="text-white/80 text-xs font-medium uppercase tracking-wider">Remaining</p>
                    <p class="text-4xl font-extrabold mt-1">{{ balance.remainingQuota }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-white/80 text-xs mb-1">Total Quota: {{ balance.totalQuota }}</p>
                    <p class="text-white/80 text-xs">Used: {{ balance.usedQuota }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Decorative shapes -->
              <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            </div>
        </template>
      </div>

      <!-- Recent Activity / Requests List -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Recent Requests</h3>
            <p class="mt-1 text-sm text-gray-500">History of your leave applications</p>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Reason
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
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
               <template v-if="isLoadingRequests">
                  <tr v-for="i in 3" :key="i">
                    <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                    <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                    <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                    <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                    <td class="px-6 py-4 whitespace-nowrap text-right"><div class="h-4 bg-gray-100 rounded w-8 animate-pulse ml-auto"></div></td>
                  </tr>
               </template>
               <template v-else-if="requests.length === 0">
                 <tr>
                   <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                     <div class="flex flex-col items-center justify-center">
                       <Calendar class="w-12 h-12 text-gray-300 mb-3" />
                       <p class="text-lg font-medium text-gray-900">No requests found</p>
                       <p class="text-sm text-gray-500 mt-1">You haven't applied for any leave yet.</p>
                       <UiButton variant="ghost" @click="isModalOpen = true" class="mt-4 text-brand-navy hover:bg-blue-50">
                         Apply Now <ChevronRight class="w-4 h-4 ml-1" />
                       </UiButton>
                     </div>
                   </td>
                 </tr>
               </template>
               <template v-else>
                 <tr v-for="req in requests" :key="req.id" class="hover:bg-gray-50 transition-colors">
                     <td class="px-6 py-4">
                       <div class="flex items-center">
                         <div>
                           <div class="text-sm font-medium text-gray-900">{{ req.leaveTypeName }}</div>
                           <div class="text-sm text-gray-500 max-w-xs truncate">{{ req.reason }}</div>
                         </div>
                       </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                       <div class="text-sm text-gray-900">
                         {{ format(new Date(req.startDate), 'MMM d') }} - {{ format(new Date(req.endDate), 'MMM d, yyyy') }}
                       </div>
                       <div class="text-xs text-gray-500 mt-0.5">
                         {{ req.totalDays }} day{{ req.totalDays > 1 ? 's' : '' }}
                       </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {{ req.submittedAt ? formatDistanceToNow(new Date(req.submittedAt), { addSuffix: true }) : '-' }}
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                       <!-- Status Badge Logic integrated here -->
                        <div v-if="req.status === LeaveRequestStatus.APPROVED || req.hrApprovalStatus === 'APPROVED'" class="flex flex-col gap-1">
                           <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                             <CheckCircle2 class="w-3 h-3 mr-1" />
                             Approved
                           </span>
                           <span class="text-xs text-gray-500">by HR</span>
                         </div>
                         <div v-else-if="req.status === LeaveRequestStatus.MANAGER_APPROVED || (req.managerApprovedAt && req.hrApprovalStatus === 'PENDING')" class="flex flex-col gap-1">
                           <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                             <CheckCircle2 class="w-3 h-3 mr-1" />
                             Manager Approved
                           </span>
                           <span class="text-xs text-gray-500">waiting for HR</span>
                         </div>
                         <div v-else-if="req.status === LeaveRequestStatus.PENDING" class="flex flex-col gap-1">
                           <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                             <Clock class="w-3 h-3 mr-1" />
                             Pending
                           </span>
                           <span class="text-xs text-gray-500">waiting for Manager/HR</span>
                         </div>
                         <span v-else-if="req.status === LeaveRequestStatus.REJECTED || req.hrApprovalStatus === 'REJECTED'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                           <XCircle class="w-3 h-3 mr-1" />
                           Rejected
                         </span>
                         <span v-else-if="req.status === LeaveRequestStatus.CANCELLED" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                           <AlertCircle class="w-3 h-3 mr-1" />
                           Cancelled
                         </span>
                         <span v-else class="text-gray-500">{{ req.status }}</span>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <UiButton 
                         v-if="req.status === LeaveRequestStatus.PENDING || req.status === LeaveRequestStatus.MANAGER_APPROVED"
                         variant="destructive" 
                         class="bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus:ring-red-200 py-1 px-3 text-xs h-auto shadow-sm" 
                         @click="handleCancel(req.id)"
                       >
                         Cancel
                       </UiButton>
                     </td>
                 </tr>
               </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal - Apply Leave -->
       <TransitionRoot as="template" :show="isModalOpen">
        <Dialog as="div" class="relative z-50" @close="isModalOpen = false">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100">
                      <div class="flex justify-between items-center">
                          <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">Apply for Leave</DialogTitle>
                           <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-500">
                             <X class="w-5 h-5" />
                           </button>
                      </div>
                  </div>
                  <div class="px-4 sm:px-8 py-6">
                    <LeaveRequestForm @success="onFormSuccess" @cancel="isModalOpen = false" />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOvertimeApprovals, useOvertimeApprovalStats } from '@/composables/useOvertime'
import OvertimeStatusBadge from '@/components/overtime/OvertimeStatusBadge.vue'
import { format } from 'date-fns'
import { User, Filter } from 'lucide-vue-next'
import { OvertimeStatus, ApproverType } from '@/types/overtime'

const statusFilter = ref<OvertimeStatus | ''>('')
const approverTypeFilter = ref<ApproverType | ''>('')

const filters = computed(() => ({
    take: 50,
    status: statusFilter.value || undefined,
    approverType: approverTypeFilter.value || undefined
}))

const { data: listResponse, loading: isLoading } = useOvertimeApprovals(filters)
const { data: stats } = useOvertimeApprovalStats()

// Use type assertion since API response might be wrapped
const requests = computed(() => {
    if (!listResponse.value) return []
    // Handle array or object structure
    if (Array.isArray(listResponse.value)) return listResponse.value
    return listResponse.value.requests || []
})

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Approval History
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            View history of all overtime approvals
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4 gap-2">
           <select 
             class="rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm"
             v-model="statusFilter"
           >
             <option value="">All Status</option>
             <option :value="OvertimeStatus.APPROVED">Approved</option>
             <option :value="OvertimeStatus.REJECTED">Rejected</option>
             <option :value="OvertimeStatus.PENDING">Pending</option>
           </select>
           <select 
             class="rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm"
             v-model="approverTypeFilter"
           >
             <option value="">All Types</option>
             <option :value="ApproverType.MANAGER">Manager</option>
             <option :value="ApproverType.HR">HR</option>
           </select>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">Total Processed</dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.total || 0 }}</dd>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">Approved</dt>
            <dd class="mt-1 text-3xl font-semibold text-green-600">{{ stats?.approved || 0 }}</dd>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">Rejected</dt>
            <dd class="mt-1 text-3xl font-semibold text-red-600">{{ stats?.rejected || 0 }}</dd>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
            <dd class="mt-1 text-3xl font-semibold text-yellow-600">{{ stats?.pending || 0 }}</dd>
          </div>
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
                    Reason
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="isLoading">
                    <tr v-for="i in 3" :key="i">
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"></td>
                    </tr>
                </template>
                <template v-else-if="requests.length === 0">
                    <tr>
                      <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center justify-center">
                          <Filter class="w-12 h-12 text-gray-300 mb-3" />
                          <p class="text-lg font-medium text-gray-900">No approvals found</p>
                          <p class="text-sm text-gray-500 mt-1">Try adjusting the filters</p>
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
                        <div class="text-xs text-gray-500 mt-0.5">
                          {{ format(new Date(request.startTime), 'HH:mm') }} - {{ format(new Date(request.endTime), 'HH:mm') }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-900 truncate max-w-xs" :title="request.reason">
                           {{ request.reason }}
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
                    </tr>
                </template>
              </tbody>
            </table>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
</template>

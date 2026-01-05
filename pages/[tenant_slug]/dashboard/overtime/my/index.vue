<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOvertimeRequests, useDeleteOvertimeRequest } from '@/composables/useOvertimeCRUD'
import OvertimeRequestForm from '@/components/overtime/OvertimeRequestForm.vue'
import OvertimeStatusBadge from '@/components/overtime/OvertimeStatusBadge.vue'
import { Plus, Clock, X } from 'lucide-vue-next'
import { format } from 'date-fns'
import type { OvertimeRequest } from '@/types/overtime'
import { OvertimeStatus } from '@/types/overtime'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const isModalOpen = ref(false)
const selectedRequest = ref<OvertimeRequest | undefined>(undefined)

const { data: response, loading: isLoading, refresh } = useOvertimeRequests({ take: 50 })
const { mutate: deleteRequest } = useDeleteOvertimeRequest()

// Handle response structure depending on API (array vs object)
const requests = computed(() => {
    if (!response.value) return []
    if (Array.isArray(response.value)) return response.value
    return response.value.requests || []
})

const handleEdit = (request: OvertimeRequest) => {
    if (request.status !== OvertimeStatus.PENDING) {
       // Ideally show toast here
       alert('Only pending requests can be edited')
       return
    }
    selectedRequest.value = request
    isModalOpen.value = true
}

const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this specific request?')) {
        await deleteRequest(id)
        refresh()
    }
}

const openNewModal = () => {
    selectedRequest.value = undefined
    isModalOpen.value = true
}

const onFormSuccess = () => {
    isModalOpen.value = false
    refresh()
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
            My Overtime
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Track and manage your overtime submissions
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button @click="openNewModal" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy shadow-lg shadow-brand-navy/20">
            <Plus class="w-4 h-4 mr-2" />
            New Overtime
          </button>
        </div>
      </div>

      <UiCard>
        <UiCardContent class="p-0 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
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
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                      <td class="px-6 py-4"></td>
                    </tr>
                 </template>
                 <template v-else-if="requests.length === 0">
                    <tr>
                      <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center justify-center">
                          <Clock class="w-12 h-12 text-gray-300 mb-3" />
                          <p class="text-lg font-medium text-gray-900">No overtime requests</p>
                          <p class="text-sm text-gray-500 mt-1">You haven't submitted any overtime requests yet.</p>
                          <button @click="openNewModal" class="mt-4 text-brand-navy hover:text-blue-900 font-medium">
                            Create Request
                          </button>
                        </div>
                      </td>
                    </tr>
                 </template>
                 <template v-else>
                    <tr v-for="request in requests" :key="request.id" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">
                          {{ format(new Date(request.date), 'MMM d, yyyy') }}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                          {{ format(new Date(request.startTime), 'HH:mm') }} - {{ format(new Date(request.endTime), 'HH:mm') }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-500 max-w-xs truncate">{{ request.reason }}</div>
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
                        <div v-if="request.status === OvertimeStatus.PENDING" class="flex justify-end gap-2">
                           <button 
                             @click="handleEdit(request)"
                             class="text-brand-navy hover:text-blue-900"
                           >
                             Edit
                           </button>
                           <button 
                             @click="handleDelete(request.id)"
                             class="text-red-600 hover:text-red-900 ml-2"
                           >
                             Delete
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

      <!-- Modal -->
      <TransitionRoot as="template" :show="isModalOpen">
        <Dialog as="div" class="relative z-50" @close="isModalOpen = false">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" />
          </TransitionChild>
    
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100">
                     <div class="flex justify-between items-center">
                        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                          {{ selectedRequest ? 'Edit Overtime Request' : 'New Overtime Request' }}
                        </DialogTitle>
                        <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-500">
                           <X class="w-5 h-5" />
                        </button>
                     </div>
                  </div>
                  <div class="px-4 py-5 sm:p-6">
                     <OvertimeRequestForm 
                        :initialData="selectedRequest"
                        @success="onFormSuccess"
                        @cancel="isModalOpen = false"
                     />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
</template>

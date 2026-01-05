<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckCircle, XCircle, X } from 'lucide-vue-next'
import type { FailedPayrollGeneration } from '@/types/payroll'

defineProps<{
  isOpen: boolean
  generated: number
  failed: FailedPayrollGeneration[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100">
                <div class="flex justify-between items-center">
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    Generation Result
                  </DialogTitle>
                  <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
                    <X class="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div class="px-6 py-6 space-y-4">
                  <div v-if="generated > 0" class="flex items-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle class="w-6 h-6 text-green-500 mr-3" />
                      <div>
                          <h4 class="text-sm font-medium text-green-800">Available Payrolls Generated</h4>
                          <p class="text-sm text-green-600">{{ generated }} payrolls created successfully.</p>
                      </div>
                  </div>

                  <div v-if="failed.length > 0" class="space-y-3">
                      <div class="flex items-center p-4 bg-red-50 rounded-lg">
                          <XCircle class="w-6 h-6 text-red-500 mr-3" />
                          <div>
                              <h4 class="text-sm font-medium text-red-800">Failed to Generate</h4>
                              <p class="text-sm text-red-600">{{ failed.length }} payrolls encountered errors.</p>
                          </div>
                      </div>

                      <div class="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                          <table class="min-w-full divide-y divide-gray-200">
                              <thead class="bg-gray-50 sticky top-0">
                                  <tr>
                                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                                  </tr>
                              </thead>
                              <tbody class="bg-white divide-y divide-gray-200">
                                  <tr v-for="(item, idx) in failed" :key="idx">
                                      <td class="px-4 py-2 text-sm text-gray-900">{{ item.employeeName || item.employeeId }}</td>
                                      <td class="px-4 py-2 text-sm text-red-600">{{ item.reason }}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                  type="button" 
                  class="inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto" 
                  @click="$emit('close')"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { X, RefreshCw } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: { periodStart: string; periodEnd: string; bonusPercentage: number }): void
}>()

const form = ref({
    periodStart: '',
    periodEnd: '',
    bonusPercentage: 0
})

const handleSubmit = () => {
    emit('submit', {
        periodStart: new Date(form.value.periodStart).toISOString(),
        periodEnd: new Date(form.value.periodEnd).toISOString(),
        bonusPercentage: form.value.bonusPercentage
    })
}
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
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900 flex items-center">
                    <RefreshCw class="w-5 h-5 mr-2 text-brand-navy" />
                    Bulk Generate Payroll
                  </DialogTitle>
                  <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 transition-colors">
                    <X class="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div class="px-6 py-6 space-y-4">
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Period Start</label>
                      <input 
                        type="date" 
                        v-model="form.periodStart"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                        required
                      />
                  </div>
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Period End</label>
                      <input 
                        type="date" 
                        v-model="form.periodEnd"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                        required
                      />
                  </div>
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Bonus Percentage (%)</label>
                      <input 
                        type="number" 
                        v-model="form.bonusPercentage"
                        min="0"
                        max="100"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                      />
                      <p class="text-xs text-gray-500 mt-1">Applied to base salary for all employees</p>
                  </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                    type="button" 
                    class="inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed" 
                    @click="handleSubmit"
                    :disabled="isLoading || !form.periodStart || !form.periodEnd"
                >
                  <RefreshCw v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                  {{ isLoading ? 'Generating...' : 'Generate All' }}
                </button>
                <button 
                    type="button" 
                    class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
                    @click="$emit('close')"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
    useLeavePeriod, 
    useUpdateLeavePeriod, 
    useLeaveTypes, 
    useDeleteLeaveType 
} from '@/composables/useLeaves'
import { ArrowLeft, Plus, Trash, Settings } from 'lucide-vue-next'
import LeaveTypeModal from '@/components/leaves/LeaveTypeModal.vue'
import type { UpdateLeavePeriodPayload } from '@/types/leaves'

const route = useRoute()
const router = useRouter()
const periodId = computed(() => Number(route.params.id))
const tenantSlug = route.params.tenant_slug as string

const { data: period, loading: isLoadingPeriod, refresh: refreshPeriod, error } = useLeavePeriod(periodId)
const { mutate: updatePeriod, loading: isUpdating } = useUpdateLeavePeriod()

const { data: leaveTypes, loading: isLoadingTypes, refresh: refreshTypes } = useLeaveTypes(periodId)
const { mutate: deleteType } = useDeleteLeaveType()

const form = ref<UpdateLeavePeriodPayload>({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    isActive: false
})

const isTypeModalOpen = ref(false)

watchEffect(() => {
    if (period.value) {
        form.value = {
            name: period.value.name,
            startDate: period.value.startDate.split('T')[0],
            endDate: period.value.endDate.split('T')[0],
            description: period.value.description,
            isActive: period.value.isActive
        }
    }
})

const onPeriodSubmit = async () => {
    await updatePeriod(periodId.value, form.value)
    refreshPeriod()
}

const handleDeleteType = async (typeId: number) => {
    if (confirm('Delete this leave type?')) {
        await deleteType(typeId)
        refreshTypes()
    }
}

const onTypeCreated = () => {
    refreshTypes()
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-8">
      <div v-if="isLoadingPeriod" class="p-8 text-center">Loading...</div>
      <div v-else-if="error || !period" class="p-8 text-center text-red-500">Period not found</div>
      <template v-else>
          <!-- Header -->
          <div class="flex items-center gap-4">
            <UiButton variant="ghost" @click="router.back()">
              <ArrowLeft class="w-4 h-4 mr-2" /> Back
            </UiButton>
            <h2 class="text-2xl font-bold text-gray-900">Edit Leave Period</h2>
          </div>

          <!-- Period Details Form -->
          <UiCard>
            <UiCardHeader><UiCardTitle>Configuration</UiCardTitle></UiCardHeader>
            <UiCardContent>
              <form @submit.prevent="onPeriodSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <UiInput 
                     label="Period Name"
                     v-model="form.name"
                   />
                   <div class="flex items-end pb-2">
                     <label class="flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" v-model="form.isActive" />
                       <span class="text-sm font-medium text-gray-700">Set as Active Period</span>
                     </label>
                   </div>
                   
                   <UiInput 
                     label="Start Date" 
                     type="date"
                     v-model="form.startDate"
                   />
                   <UiInput 
                     label="End Date" 
                     type="date"
                     v-model="form.endDate"
                   />
                </div>
                
                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    class="w-full min-h-[80px] border border-gray-300 rounded-md p-2"
                    v-model="form.description"
                  />
                </div>

                <div class="flex justify-end">
                  <UiButton type="submit" :disabled="isUpdating">Save Changes</UiButton>
                </div>
              </form>
            </UiCardContent>
          </UiCard>

          <!-- Leave Types Section -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
               <h3 class="text-xl font-bold text-gray-800">Leave Types & Quotas</h3>
               <UiButton @click="isTypeModalOpen = true">
                 <Plus class="w-4 h-4 mr-2" /> Add Leave Type
               </UiButton>
            </div>

            <UiCard>
              <UiCardContent class="p-0 overflow-hidden">
                 <table class="w-full text-sm text-left">
                   <thead class="bg-gray-50 border-b">
                     <tr>
                       <th class="px-4 py-3 font-medium text-gray-500">Code</th>
                       <th class="px-4 py-3 font-medium text-gray-500">Name</th>
                       <th class="px-4 py-3 font-medium text-gray-500">Quota</th>
                       <th class="px-4 py-3 font-medium text-gray-500">Settings</th>
                       <th class="px-4 py-3 font-medium text-right text-gray-500">Action</th>
                     </tr>
                   </thead>
                   <tbody class="divide-y">
                     <tr v-if="isLoadingTypes">
                         <td colspan="5" class="p-4 text-center">Loading types...</td>
                     </tr>
                     <tr v-else-if="!leaveTypes || leaveTypes.length === 0">
                         <td colspan="5" class="p-4 text-center text-gray-500 italic">No leave types defined.</td>
                     </tr>
                     <tr v-else v-for="lt in leaveTypes" :key="lt.id" class="hover:bg-gray-50">
                           <td class="px-4 py-3 font-mono text-xs">{{ lt.type }}</td>
                           <td class="px-4 py-3 font-medium">{{ lt.name }}</td>
                           <td class="px-4 py-3">{{ lt.defaultQuota }} Days</td>
                           <td class="px-4 py-3 text-xs text-gray-500 space-y-1">
                              <div>Max Consec: {{ lt.maxConsecutiveDays }}d</div>
                              <div>Notice: {{ lt.advanceNoticeDays }}d</div>
                              <div v-if="lt.isCarryForward" class="text-green-600">Carry Fwd: {{ lt.maxCarryForward }}d</div>
                           </td>
                           <td class="px-4 py-3 text-right">
                              <UiButton 
                                variant="destructive" 
                                class="h-8 px-2"
                                @click="handleDeleteType(lt.id)"
                              >
                                <Trash class="w-4 h-4" />
                              </UiButton>
                           </td>
                     </tr>
                   </tbody>
                 </table>
              </UiCardContent>
            </UiCard>
          </div>

          <LeaveTypeModal 
            :isOpen="isTypeModalOpen"
            :leavePeriodId="periodId"
            @close="isTypeModalOpen = false"
            @created="onTypeCreated"
          />
      </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Users, UserPlus, Network } from 'lucide-vue-next'
import { 
  useEmployee, 
  useAssignManager, 
  useAssignSubordinates, 
  useAllEmployees 
} from '@/composables/useEmployees'
import type { Employee } from '@/types/employee'
import SubordinateManager from './SubordinateManager.vue'
import OrgChart from './OrgChart.vue'

const props = defineProps<{
  employeeId: string
}>()

const { data: employee } = useEmployee(props.employeeId)
const { data: allEmployees } = useAllEmployees()
const { mutate: assignManager, loading: isAssigningManager } = useAssignManager()
const { mutate: assignSubordinates, loading: isAssigningSubordinates } = useAssignSubordinates()

const showOrgChart = ref(false)
const isEditManager = ref(false)
const selectedManagerId = ref<number | null>(null)

const otherEmployees = computed(() => {
    return allEmployees.value?.filter(e => e.id !== props.employeeId) || []
})

const handleAssignManager = async () => {
    await assignManager(props.employeeId, { managerId: selectedManagerId.value })
    isEditManager.value = false
}

const handleStartEditManager = () => {
    selectedManagerId.value = employee.value?.managerId || null
    isEditManager.value = true
}

const getManagerName = (managerId: number) => {
    const mgr = allEmployees.value?.find(e => String(e.id) === String(managerId))
    return mgr
}

const saveSubordinates = async (ids: number[]) => {
    await assignSubordinates(props.employeeId, { subordinateIds: ids })
}
</script>

<template>
  <div v-if="employee" class="space-y-6">
       
       <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
         <div>
           <h3 class="text-lg font-medium text-gray-900">Organization Hierarchy</h3>
           <p class="text-sm text-gray-500">Manage reporting lines and view structure</p>
         </div>
         <UiButton 
            variant="secondary" 
            @click="showOrgChart = !showOrgChart"
         >
           <Network class="w-4 h-4 mr-2" />
           {{ showOrgChart ? 'Hide Org Chart' : 'View Inheritance' }}
         </UiButton>
       </div>

       <UiCard v-if="showOrgChart">
            <UiCardHeader><UiCardTitle>Organization Chart</UiCardTitle></UiCardHeader>
            <UiCardContent>
               <OrgChart :employeeId="employeeId" />
            </UiCardContent>
       </UiCard>

       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <!-- Manager Section -->
         <UiCard>
           <UiCardHeader class="pb-2">
             <UiCardTitle class="text-base flex items-center gap-2">
               <Users class="w-4 h-4 text-purple-600" />
               Reports To (Manager)
             </UiCardTitle>
           </UiCardHeader>
           <UiCardContent>
             <div v-if="isEditManager" class="space-y-3">
                 <select 
                   v-model="selectedManagerId"
                   class="w-full p-2 border rounded-md text-sm bg-white text-black"
                 >
                   <option :value="null">-- No Manager --</option>
                   <option v-for="e in otherEmployees" :key="e.id" :value="Number(e.id)">
                     {{ e.firstName }} {{ e.lastName }} ({{ e.position }})
                   </option>
                 </select>
                 <div class="flex gap-2">
                   <UiButton @click="handleAssignManager" :isLoading="isAssigningManager">Save</UiButton>
                   <UiButton variant="ghost" @click="isEditManager = false">Cancel</UiButton>
                 </div>
             </div>
             <div v-else class="flex justify-between items-center">
                 <div>
                   <template v-if="employee.managerId">
                      <div v-if="getManagerName(employee.managerId)">
                            <p class="font-medium text-gray-900">{{ getManagerName(employee.managerId)?.firstName }} {{ getManagerName(employee.managerId)?.lastName }}</p>
                            <p class="text-xs text-gray-500">{{ getManagerName(employee.managerId)?.position }}</p>
                      </div>
                      <p v-else class="text-gray-500 italic">Unknown Manager (ID: {{ employee.managerId }})</p>
                   </template>
                   <p v-else class="text-gray-500 italic">No manager assigned</p>
                 </div>
                 <UiButton variant="secondary" @click="handleStartEditManager">
                   Change
                 </UiButton>
             </div>
           </UiCardContent>
         </UiCard>

         <!-- Subordinates Section -->
         <UiCard>
           <UiCardHeader class="pb-2">
             <UiCardTitle class="text-base flex items-center gap-2">
               <UserPlus class="w-4 h-4 text-green-600" />
               Direct Reports (Subordinates)
             </UiCardTitle>
           </UiCardHeader>
           <UiCardContent>
              <SubordinateManager 
                 :employeeId="employeeId" 
                 :currentSubordinates="allEmployees?.filter(e => String(e.managerId) === String(employeeId)) || []"
                 :allEmployees="otherEmployees"
                 @save="saveSubordinates"
                 :isSaving="isAssigningSubordinates"
              />
           </UiCardContent>
         </UiCard>
       </div>
    </div>
</template>

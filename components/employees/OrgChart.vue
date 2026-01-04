<script setup lang="ts">
import { computed } from 'vue'
import { User } from 'lucide-vue-next'
import { useOrganizationTree } from '@/composables/useEmployees'
import { cn } from '@/utils'
import NodeCard from './NodeCard.vue'

const props = defineProps<{
  employeeId: string
}>()
</script>

<template>
  <div v-if="loading" class="p-8 text-center text-gray-500">Loading organization chart...</div>
  <div v-else-if="error || !tree" class="p-8 text-center text-red-500">Failed to load organization chart</div>
  
  <div v-else class="flex flex-col items-center space-y-8 p-6 overflow-auto bg-gray-50 rounded-xl min-h-[400px]">
      
      <!-- Manager Level -->
      <div v-if="tree.manager" class="flex flex-col items-center">
            <NodeCard 
              :name="`${tree.manager.firstName} ${tree.manager.lastName}`" 
              :position="tree.manager.position"
              isManager
            />
            <div class="h-8 w-px bg-gray-300"></div>
      </div>
      <div v-else class="text-xs text-gray-400 mb-4 italic">No Manager (Root)</div>

      <!-- Current Employee Level -->
      <div class="flex flex-col items-center relative z-10">
            <NodeCard 
              :name="`${tree.employee.firstName} ${tree.employee.lastName}`" 
              :position="tree.employee.position"
              isCurrent
            />
            <div v-if="tree.subordinates.length > 0" class="h-8 w-px bg-gray-300"></div>
      </div>

      <!-- Subordinates Level -->
      <div v-if="tree.subordinates.length > 0" class="flex gap-6 items-start justify-center relative">
           <!-- Horizontal bar connecting children if more than 1 -->
           <div v-if="tree.subordinates.length > 1" class="absolute -top-4 left-10 right-10 h-px bg-gray-300"></div>
           
           <div v-for="sub in tree.subordinates" :key="sub.id" class="flex flex-col items-center relative">
               <!-- Vertical connector from horizontal bar -->
               <div class="h-4 w-px bg-gray-300 absolute -top-4"></div>
               
               <NodeCard 
                 :name="`${sub.firstName} ${sub.lastName}`" 
                 :position="sub.position"
                 isSubordinate
               />
           </div>
      </div>

      <div v-if="tree.subordinates.length === 0" class="text-xs text-gray-400 italic">No direct subordinates</div>
  </div>
</template>

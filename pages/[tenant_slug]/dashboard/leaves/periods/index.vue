<script setup lang="ts">
import { useLeavePeriods, useDeleteLeavePeriod } from '@/composables/useLeaves'
import { Plus, Edit, Trash, Check, X } from 'lucide-vue-next'
import { format } from 'date-fns'

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string
const { data: response, loading, refresh } = useLeavePeriods()
const { mutate: deletePeriod, loading: isDeleting } = useDeleteLeavePeriod()

const periods = computed(() => response.value?.data || [])

const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this leave period?')) {
        await deletePeriod(id)
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
          <h2 class="text-2xl font-bold text-gray-900">Leave Configuration</h2>
          <p class="text-sm text-gray-500">Manage leave periods and entitlements</p>
        </div>
        <NuxtLink :to="`/${tenantSlug}/dashboard/leaves/periods/create`">
          <UiButton>
            <Plus class="w-4 h-4 mr-2" />
            Create Period
          </UiButton>
        </NuxtLink>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Leave Periods</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="overflow-x-auto">
             <div v-if="loading" class="flex justify-center py-8">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
             </div>
             
             <table v-else class="w-full text-sm text-left">
              <thead class="bg-gray-50 border-b">
                <tr>
                  <th class="px-4 py-3 font-medium text-gray-500">Name</th>
                  <th class="px-4 py-3 font-medium text-gray-500">Start Date</th>
                  <th class="px-4 py-3 font-medium text-gray-500">End Date</th>
                  <th class="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th class="px-4 py-3 font-medium text-gray-500">Description</th>
                  <th class="px-4 py-3 font-medium text-right text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                  <tr v-if="periods.length === 0">
                    <td colspan="6" class="px-4 py-6 text-center text-gray-500 italic">
                      No leave periods found.
                    </td>
                  </tr>
                  <tr v-else v-for="period in periods" :key="period.id" class="hover:bg-gray-50">
                      <td class="px-4 py-3 font-medium text-gray-900">{{ period.name }}</td>
                       <td class="px-4 py-3 text-gray-600">{{ format(new Date(period.startDate), 'MMM dd, yyyy') }}</td>
                       <td class="px-4 py-3 text-gray-600">{{ format(new Date(period.endDate), 'MMM dd, yyyy') }}</td>
                       <td class="px-4 py-3">
                          <span v-if="period.isActive" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                             <Check class="w-3 h-3 mr-1" /> Active
                          </span>
                           <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                             <X class="w-3 h-3 mr-1" /> Inactive
                           </span>
                       </td>
                       <td class="px-4 py-3 text-gray-500 truncate max-w-[200px]">{{ period.description }}</td>
                       <td class="px-4 py-3 text-right space-x-2">
                           <NuxtLink :to="`/${tenantSlug}/dashboard/leaves/periods/${period.id}`">
                             <UiButton variant="secondary" class="h-8 px-2">
                               <Edit class="w-4 h-4" />
                             </UiButton>
                           </NuxtLink>
                           <UiButton 
                              variant="destructive" 
                              class="h-8 px-2"
                              @click="handleDelete(period.id)"
                              :disabled="isDeleting"
                            >
                                <Trash class="w-4 h-4" />
                            </UiButton>
                       </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
</template>

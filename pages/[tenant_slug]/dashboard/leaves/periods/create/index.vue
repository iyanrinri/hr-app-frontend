<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCreateLeavePeriod } from '@/composables/useLeaves'
import { ArrowLeft } from 'lucide-vue-next'
import type { CreateLeavePeriodPayload } from '@/types/leaves'

const router = useRouter()
const route = useRoute()
const tenantSlug = route.params.tenant_slug as string
const { mutate: createPeriod, loading: isPending } = useCreateLeavePeriod()

const form = ref<CreateLeavePeriodPayload>({
    name: '',
    startDate: '',
    endDate: '',
    description: ''
})

const errors = ref<Partial<Record<keyof CreateLeavePeriodPayload, string>>>({})

const validate = () => {
    errors.value = {}
    if (!form.value.name || form.value.name.length < 3) errors.value.name = 'Name is required (min 3 chars)'
    if (!form.value.startDate) errors.value.startDate = 'Start date is required'
    if (!form.value.endDate) errors.value.endDate = 'End date is required'
    return Object.keys(errors.value).length === 0
}

const onSubmit = async () => {
    if (!validate()) return

    try {
        await createPeriod(form.value)
        router.push(`/${tenantSlug}/dashboard/leaves/periods`)
    } catch (e) {
        // Error handled by composable or toast globally if setup
    }
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
    <div class="space-y-6 max-w-2xl mx-auto">
      <div class="flex items-center gap-4">
        <UiButton variant="ghost" @click="router.back()">
          <ArrowLeft class="w-4 h-4 mr-2" /> Back
        </UiButton>
        <h2 className="text-2xl font-bold text-gray-900">Create Leave Period</h2>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Period Details</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <form @submit.prevent="onSubmit" class="space-y-6">
            <UiInput 
              label="Period Name (e.g. Annual Leave 2025)"
              v-model="form.name"
              :error="errors.name"
            />
            
            <div class="grid grid-cols-2 gap-4">
              <UiInput 
                label="Start Date"
                type="date"
                v-model="form.startDate"
                :error="errors.startDate"
              />
              <UiInput 
                label="End Date"
                type="date"
                v-model="form.endDate"
                :error="errors.endDate"
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                class="w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy"
                placeholder="Optional description..."
                v-model="form.description"
              />
            </div>

            <div class="flex justify-end gap-3">
              <UiButton type="button" variant="secondary" @click="router.back()">Cancel</UiButton>
              <UiButton type="submit" :disabled="isPending">
                <span v-if="isPending" class="mr-2">Loading...</span>
                Create Period
              </UiButton>
            </div>
          </form>
        </UiCardContent>
      </UiCard>
    </div>
</template>

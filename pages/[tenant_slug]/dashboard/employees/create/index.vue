<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import type { CreateEmployeePayload } from '@/types/employee'

const route = useRoute()
const router = useRouter()
const tenantSlug = route.params.tenant_slug as string

definePageMeta({
  layout: 'dashboard'
})

const { mutate: createEmployee, loading } = useCreateEmployee()

const form = ref<CreateEmployeePayload>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  position: '',
  department: '',
  joinDate: '',
  baseSalary: 0
})

const goBack = () => {
  router.push(`/${tenantSlug}/dashboard/employees`)
}

const handleSubmit = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.password || !form.value.position || !form.value.department || !form.value.joinDate) {
    alert('Please fill in all required fields')
    return
  }

  // Ensure joinDate is ISO
  const payload = {
    ...form.value,
    joinDate: new Date(form.value.joinDate).toISOString()
  }

  try {
    await createEmployee(payload)
    // Maybe show success?
    goBack()
  } catch (e) {
    console.error(e)
    alert('Failed to create employee')
  }
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center space-x-4">
      <UiButton variant="ghost" @click="goBack">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </UiButton>
      <h2 class="text-2xl font-bold text-gray-900">Add New Employee</h2>
    </div>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Employee Details</UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UiInput
              label="First Name"
              v-model="form.firstName"
              required
            />
            <UiInput
              label="Last Name"
              v-model="form.lastName"
              required
            />
            <UiInput
              label="Email Address"
              type="email"
              v-model="form.email"
              required
            />
            <UiInput
              label="Password"
              type="password"
              v-model="form.password"
              required
            />
            <UiInput
              label="Position"
              v-model="form.position"
              required
            />
            <UiInput
              label="Department"
              v-model="form.department"
              required
            />
            <UiInput
              label="Join Date"
              type="date"
              v-model="form.joinDate"
              required
            />
            <UiInput
              label="Base Salary"
              type="number"
              v-model="form.baseSalary"
              required
            />
          </div>

          <div class="flex justify-end space-x-4">
            <UiButton type="button" variant="secondary" @click="goBack">
              Cancel
            </UiButton>
            <UiButton type="submit" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Employee' }}
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>

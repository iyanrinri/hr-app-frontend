<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import type { CreateEmployeePayload } from '@/types/employee'
import { useEmployee, useUpdateEmployee } from '@/composables/useEmployees'
import { 
  useEmployeeProfile, 
  useUpdateEmployeeProfile, 
  useUploadEmployeePicture, 
  useDeleteEmployeePicture 
} from '@/composables/useEmployeeProfile'

import ProfileView from '@/components/profile/ProfileView.vue'
import ProfileForm from '@/components/profile/ProfileForm.vue'
import ProfilePictureUpload from '@/components/profile/ProfilePictureUpload.vue'
import HierarchyManager from '@/components/employees/HierarchyManager.vue'
import EmployeeSalaryAdjustmentHistory from '@/components/employees/EmployeeSalaryAdjustmentHistory.vue'

const route = useRoute()
const router = useRouter()
const tenantSlug = route.params.tenant_slug as string
const id = route.params.id as string

definePageMeta({
  layout: 'dashboard'
})

const { data: employee, loading: isLoadingEmployee, error } = useEmployee(id)
const { mutate: updateEmployee, loading: updating } = useUpdateEmployee()

// Extended Profile Data
const { data: profile, loading: isLoadingProfile, refresh: refreshProfile } = useEmployeeProfile(id)
const { mutate: updateProfile, loading: isUpdatingProfile } = useUpdateEmployeeProfile()
const { mutate: uploadPicture, loading: isUploadingPicture } = useUploadEmployeePicture()
const { mutate: deletePicture, loading: isDeletingPicture } = useDeleteEmployeePicture()

const activeTab = ref<'details' | 'profile' | 'management' | 'salary'>('details')
const isEditingProfile = ref(false)

// Using similar payload type to create, but password optional
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

watch(employee, (emp) => {
  if (emp) {
    form.value = {
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.user?.email || '',
      password: '', // Don't fill password
      position: emp.position,
      department: emp.department,
      joinDate: emp.joinDate ? emp.joinDate.split('T')[0] : '', // Format for date input
      baseSalary: emp.baseSalary
    }
  }
}, { immediate: true })

const goBack = () => {
  router.push(`/${tenantSlug}/dashboard/employees`)
}

const onSubmitAccount = async () => {
  const payload: Partial<CreateEmployeePayload> = { ...form.value }
  // Remove password if empty
  if (!payload.password) {
    delete payload.password
  }

  // ISO date
  if (payload.joinDate) {
    payload.joinDate = new Date(payload.joinDate).toISOString()
  }

  try {
    await updateEmployee(id, payload)
    alert('Employee updated successfully')
  } catch (e) {
    console.error(e)
    alert('Failed to update employee')
  }
}

const handleUploadPicture = async (file: File) => {
    try {
        await uploadPicture(id, file)
        await refreshProfile()
        alert('Profile picture uploaded')
    } catch (e) {
        console.error(e)
        alert('Failed to upload profile picture')
    }
}

const handleDeletePicture = async () => {
    try {
        await deletePicture(id)
        await refreshProfile()
        alert('Profile picture removed')
    } catch (e) {
        console.error(e)
        alert('Failed to remove profile picture')
    }
}

const handleUpdateProfile = async (data: any) => {
    try {
        await updateProfile(id, data)
        await refreshProfile()
        isEditingProfile.value = false
        alert('Profile updated successfully')
    } catch (e) {
        console.error(e)
        alert('Failed to update profile')
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
      <h2 class="text-2xl font-bold text-gray-900">Edit Employee</h2>
    </div>

    <!-- Tabs -->
    <div class="flex gap-4 border-b border-gray-200 overflow-x-auto">
      <button
        v-for="tab in ['details', 'profile', 'management', 'salary']"
        :key="tab"
        :class="['px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap capitalize', activeTab === tab ? 'border-brand-navy text-brand-navy' : 'border-transparent text-gray-500 hover:text-gray-700']"
        @click="activeTab = tab as any"
      >
        {{ tab === 'details' ? 'Account Settings' : tab === 'profile' ? 'Profile Information' : tab === 'management' ? 'Management & Hierarchy' : 'Salary & History' }}
      </button>
    </div>

    <!-- Content -->
    <div class="mt-6">
      <div v-if="isLoadingEmployee && !employee" class="text-center py-12">Loading...</div>
      <div v-else-if="error || !employee" class="text-center py-12 text-red-500">Error loading employee</div>
      
      <div v-else>
        <!-- Account Settings Tab -->
        <UiCard v-if="activeTab === 'details'">
          <UiCardHeader>
            <UiCardTitle>Account Settings</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <form @submit.prevent="onSubmitAccount" class="space-y-6">
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
                  label="Password (leave empty to keep current)"
                  type="password"
                  v-model="form.password"
                  placeholder="Enter new password or leave empty"
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
                <UiButton type="submit" :disabled="updating">
                  {{ updating ? 'Saving...' : 'Save Changes' }}
                </UiButton>
              </div>
            </form>
          </UiCardContent>
        </UiCard>

        <!-- Profile Tab -->
        <UiCard v-if="activeTab === 'profile'">
            <UiCardHeader class="flex flex-row items-center justify-between">
              <UiCardTitle>Extended Profile</UiCardTitle>
              <UiButton 
                  v-if="!isEditingProfile"
                  @click="isEditingProfile = true" 
                  variant="secondary" 
                  class="py-1 px-3 h-8 text-xs"
                >
                  Edit Profile
                </UiButton>
            </UiCardHeader>
            <UiCardContent>
                <div v-if="isLoadingProfile" class="py-12 flex justify-center">
                   <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
                </div>
                <div v-else-if="!profile" class="py-12 text-center text-gray-500">
                   Profile not found or could not be loaded.
                </div>
                <div v-else>
                    <div class="mb-8 flex justify-center pb-6 border-b border-gray-100">
                        <ProfilePictureUpload 
                          :currentImageUrl="profile.profilePicture || profile.profilePictureUrl" 
                          :altText="`${profile.firstName} ${profile.lastName}`"
                          @upload="handleUploadPicture"
                          @delete="handleDeletePicture"
                          :isUploading="isUploadingPicture"
                          :isDeleting="isDeletingPicture"
                          :canEdit="true"
                          size="xl"
                        />
                    </div>

                    <ProfileForm 
                      v-if="isEditingProfile"
                      :initialData="profile" 
                      @submit="handleUpdateProfile"
                      @cancel="isEditingProfile = false"
                      :isLoading="isUpdatingProfile"
                      :isAdmin="true" 
                    />
                    <ProfileView v-else :profile="profile" />
                </div>
            </UiCardContent>
        </UiCard>

        <!-- Management Tab -->
        <div v-if="activeTab === 'management'">
            <HierarchyManager :employeeId="id" />
        </div>

        <!-- Salary Tab -->
        <div v-if="activeTab === 'salary'">
            <EmployeeSalaryAdjustmentHistory :employeeId="id" :currentBaseSalary="employee?.baseSalary" />
        </div>

      </div>
    </div>
  </div>
</template>

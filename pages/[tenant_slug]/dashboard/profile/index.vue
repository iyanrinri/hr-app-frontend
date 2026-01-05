<script setup lang="ts">
import { ref } from 'vue'
import { useMyProfile, useUpdateMyProfile, useUploadMyProfilePicture, useDeleteMyProfilePicture } from '@/composables/useEmployeeProfile'
import ProfileView from '@/components/profile/ProfileView.vue'
import ProfileForm from '@/components/profile/ProfileForm.vue'
import ProfilePictureUpload from '@/components/profile/ProfilePictureUpload.vue'
import { Mail, Shield, BadgeCheck, Pencil } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const { data: profile, loading: isLoading, refresh } = useMyProfile()
const { mutate: updateProfile, loading: isUpdating } = useUpdateMyProfile()
const { mutate: uploadPicture, loading: isUploading } = useUploadMyProfilePicture()
const { mutate: deletePicture, loading: isDeleting } = useDeleteMyProfilePicture()

const isEditing = ref(false)

const handleUpload = async (file: File) => {
    await uploadPicture(file)
    refresh()
}

const handleDeletePicture = async () => {
    await deletePicture()
    refresh()
}

const handleUpdateProfile = async (data: any) => {
    await updateProfile(data, {
        onSuccess: () => {
             isEditing.value = false
             refresh()
        }
    })
}
</script>

<template>
    <div v-if="isLoading || !profile" class="min-h-[400px] flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
    </div>

    <div v-else class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Profile
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            View and manage your personal information
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
           <button 
             v-if="!isEditing"
             @click="isEditing = true"
             class="inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-brand-navy/20 text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
           >
              <Pencil class="w-4 h-4 mr-2" />
              Edit Profile
           </button>
        </div>
      </div>

      <div class="relative mb-8">
        <!-- Decorative Background -->
        <div class="h-48 rounded-xl bg-gradient-to-r from-brand-navy/90 via-blue-600/90 to-indigo-600/90 shadow-xl overflow-hidden relative">
          <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
          <div class="absolute top-0 right-0 p-8 opacity-10">
            <BadgeCheck class="w-64 h-64 text-white transform rotate-12" />
          </div>
        </div>
        
        <!-- Profile Header Info -->
        <div class="px-8 relative">
           <div class="flex flex-col md:flex-row items-end gap-6 -mt-12">
            <div class="relative z-10">
              <ProfilePictureUpload 
                :currentImageUrl="profile.profilePicture || profile.profilePictureUrl" 
                :altText="`${profile.firstName} ${profile.lastName}`"
                :isUploading="isUploading"
                :isDeleting="isDeleting"
                :canEdit="true"
                size="lg"
                @upload="handleUpload"
                @delete="handleDeletePicture"
              />
            </div>
            
            <div class="flex-1 pb-2">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ profile.firstName }} {{ profile.lastName }}
              </h1>
              <div class="flex flex-wrap items-center text-sm text-gray-600 gap-3 mt-2 font-medium">
                <span class="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  <Shield class="w-3.5 h-3.5 mr-2 text-brand-navy" />
                  {{ profile.user?.role || profile.role }}
                </span>
                <span class="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  <Mail class="w-3.5 h-3.5 mr-2 text-brand-navy" />
                  {{ profile.user?.email || profile.email }}
                </span>
                <span class="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  <BadgeCheck class="w-3.5 h-3.5 mr-2 text-brand-navy" />
                  #{{ profile.employeeNumber || profile.id }}
                </span>
              </div>
            </div>

            <div class="pb-4 z-10">
               <button 
                 v-if="!isEditing"
                 @click="isEditing = true"
                 class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-md text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
               >
                  <Pencil class="w-4 h-4 mr-2" />
                  Edit Profile
               </button>
            </div>
           </div>
        </div>
      </div>

      <div class="mt-16 pt-2">
          <div v-if="isEditing" class="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div class="mb-6 pb-6 border-b border-gray-100">
                  <h2 class="text-xl font-bold text-gray-900">Edit Profile Information</h2>
                  <p class="text-sm text-gray-500 mt-1">Update your personal and contact details</p>
              </div>
              <ProfileForm 
                :initialData="profile" 
                :isLoading="isUpdating"
                :isAdmin="false" 
                @submit="handleUpdateProfile"
                @cancel="isEditing = false"
              />
          </div>
          <ProfileView v-else :profile="profile" />
      </div>
    </div>
</template>

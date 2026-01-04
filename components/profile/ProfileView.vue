<script setup lang="ts">
import { 
  User, 
  Phone, 
  MapPin, 
  Building2, 
  Calendar, 
  CreditCard, 
  Heart, 
  Briefcase, 
  BadgeCheck 
} from 'lucide-vue-next'
import type { EmployeeProfile } from '@/types/employee'

const props = defineProps<{
  profile: EmployeeProfile
}>()

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
  } catch {
    return dateString
  }
}
import ProfileInfoItem from './InfoItem.vue'
</script>

<template>
  <div class="space-y-6">
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Personal Details Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100 flex items-center">
          <User class="w-5 h-5 mr-2 text-brand-navy" />
          <h3 class="text-lg font-semibold text-gray-900">Personal Details</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileInfoItem 
                :icon="User" 
                label="Full Name" 
                :value="`${profile.firstName} ${profile.lastName}`" 
            />
            <ProfileInfoItem 
                :icon="Calendar" 
                label="Date of Birth" 
                :value="formatDate(profile.dateOfBirth)" 
            />
            <ProfileInfoItem 
                :icon="User" 
                label="Gender" 
                :value="profile.gender?.replace('_', ' ') || '-'" 
            />
            <ProfileInfoItem 
                :icon="Heart" 
                label="Marital Status" 
                :value="profile.maritalStatus || '-'" 
            />
            <ProfileInfoItem 
                :icon="User" 
                label="Nationality" 
                :value="profile.nationality || '-'" 
            />
            <ProfileInfoItem 
                :icon="User" 
                label="Religion" 
                :value="profile.religion || '-'" 
            />
            <ProfileInfoItem 
                :icon="Heart" 
                label="Blood Type" 
                :value="profile.bloodType || '-'" 
            />
            <ProfileInfoItem 
                :icon="CreditCard" 
                label="ID Number (NIK)" 
                :value="profile.idNumber || '-'" 
            />
            <ProfileInfoItem 
                :icon="CreditCard" 
                label="Tax Number (NPWP)" 
                :value="profile.taxNumber || '-'" 
            />
          </div>
        </div>
      </div>

      <!-- Contact Information Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100 flex items-center">
          <Phone class="w-5 h-5 mr-2 text-emerald-700" />
          <h3 class="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileInfoItem 
                :icon="Phone" 
                label="Phone Number" 
                :value="profile.phoneNumber" 
            />
            <ProfileInfoItem 
                :icon="Phone" 
                label="Alt Phone" 
                :value="profile.alternativePhone" 
            />
            <ProfileInfoItem 
                :icon="MapPin" 
                label="City" 
                :value="profile.city" 
            />
            <ProfileInfoItem 
                :icon="MapPin" 
                label="Province" 
                :value="profile.province" 
            />
            <ProfileInfoItem 
                :icon="MapPin" 
                label="Postal Code" 
                :value="profile.postalCode" 
            />
            <div class="md:col-span-2">
              <ProfileInfoItem 
                :icon="MapPin" 
                label="Address" 
                :value="profile.address" 
              />
            </div>
            <div class="md:col-span-2 pt-4 border-t border-gray-100 mt-2">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Emergency Contact</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileInfoItem 
                    :icon="User" 
                    label="Name" 
                    :value="profile.emergencyContactName" 
                />
                <ProfileInfoItem 
                    :icon="Phone" 
                    label="Phone" 
                    :value="profile.emergencyContactPhone" 
                />
                <ProfileInfoItem 
                    :icon="Heart" 
                    label="Relation" 
                    :value="profile.emergencyContactRelation" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Employment Details Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100 flex items-center">
          <Briefcase class="w-5 h-5 mr-2 text-amber-700" />
          <h3 class="text-lg font-semibold text-gray-900">Employment Details</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileInfoItem 
                :icon="BadgeCheck" 
                label="Employee ID" 
                :value="profile.employeeNumber || profile.id" 
            />
            <ProfileInfoItem 
                :icon="Briefcase" 
                label="Status" 
                :value="profile.employmentStatus" 
            />
            <ProfileInfoItem 
                :icon="Briefcase" 
                label="Position" 
                :value="profile.position || profile?.user?.role" 
            />
            <ProfileInfoItem 
                :icon="Building2" 
                label="Department" 
                :value="profile.department" 
            />
            <ProfileInfoItem 
                :icon="MapPin" 
                label="Work Location" 
                :value="profile.workLocation" 
            />
            <ProfileInfoItem 
                :icon="Calendar" 
                label="Join Date" 
                :value="formatDate(profile.joinDate)" 
            />
            <template v-if="profile.contractStartDate || profile.contractEndDate">
                <ProfileInfoItem 
                    :icon="Calendar" 
                    label="Contract Start" 
                    :value="formatDate(profile.contractStartDate)" 
                />
                <ProfileInfoItem 
                    :icon="Calendar" 
                    label="Contract End" 
                    :value="formatDate(profile.contractEndDate)" 
                />
            </template>
          </div>
        </div>
      </div>

      <!-- Financial Information Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div class="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100 flex items-center">
          <CreditCard class="w-5 h-5 mr-2 text-purple-700" />
          <h3 class="text-lg font-semibold text-gray-900">Financial Information</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-4">
            <ProfileInfoItem 
                :icon="Building2" 
                label="Bank Name" 
                :value="profile.bankName" 
            />
            <ProfileInfoItem 
                :icon="CreditCard" 
                label="Account Number" 
                :value="profile.bankAccountNumber" 
            />
            <ProfileInfoItem 
                :icon="User" 
                label="Account Holder" 
                :value="profile.bankAccountName || profile.bankAccountHolder" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

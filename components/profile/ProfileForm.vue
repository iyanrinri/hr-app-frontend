<script setup lang="ts">
import { ref, watch } from 'vue'
import { Save, X } from 'lucide-vue-next'
import { 
  Gender, 
  MaritalStatus, 
  EmploymentStatus, 
  type EmployeeProfile, 
  type UpdateProfilePayload 
} from '@/types/employee'

const props = withDefaults(defineProps<{
  initialData: EmployeeProfile;
  isLoading?: boolean;
  isAdmin?: boolean;
}>(), {
  isLoading: false,
  isAdmin: false
})

const emit = defineEmits<{
  (e: 'submit', payload: UpdateProfilePayload): void
  (e: 'cancel'): void
}>()

const INDONESIAN_RELIGIONS = [
  'ISLAM',
  'PROTESTANT',
  'CATHOLIC',
  'HINDU',
  'BUDDHA',
  'CONFUCIANISM',
  'OTHER'
];

const INDONESIAN_PROVINCES = [
  'Aceh', 'Bali', 'Banten', 'Bengkulu', 'DI Yogyakarta', 'DKI Jakarta',
  'Gorontalo', 'Jambi', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
  'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Tengah', 'Kalimantan Timur', 'Kalimantan Utara',
  'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'Lampung', 'Maluku', 'Maluku Utara',
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Papua', 'Papua Barat', 'Riau',
  'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tengah', 'Sulawesi Tenggara', 'Sulawesi Utara',
  'Sumatera Barat', 'Sumatera Selatan', 'Sumatera Utara', 'Other'
];

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EMERGENCY_RELATIONS = [
  'Parent', 'Husband', 'Wife', 'Spouse', 'Sibling', 'Child', 'Relative', 'Friend', 'Other'
];

const formData = ref<UpdateProfilePayload>({})

const isOtherReligion = ref(false)
const isOtherProvince = ref(false)

watch(() => props.initialData, (data) => {
  if (data) {
    formData.value = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber || '',
        alternativePhone: data.alternativePhone || '',
        address: data.address || '',
        city: data.city || '',
        province: data.province || '',
        postalCode: data.postalCode || '',
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality || '',
        religion: data.religion || '',
        bloodType: data.bloodType || '',
        idNumber: data.idNumber || '', 
        taxNumber: data.taxNumber || '',
        bankName: data.bankName || '',
        bankAccountNumber: data.bankAccountNumber || '',
        bankAccountName: data.bankAccountName || data.bankAccountHolder || '',
        emergencyContactName: data.emergencyContactName || '',
        emergencyContactPhone: data.emergencyContactPhone || '',
        emergencyContactRelation: data.emergencyContactRelation || '',
        // Admin fields
        employmentStatus: data.employmentStatus,
        workLocation: data.workLocation || '',
        joinDate: data.joinDate ? data.joinDate.split('T')[0] : '',
        position: data.position || '',
        department: data.department || '',
        employeeNumber: data.employeeNumber || '',
        contractStartDate: data.contractStartDate ? data.contractStartDate.split('T')[0] : '',
        contractEndDate: data.contractEndDate ? data.contractEndDate.split('T')[0] : '',
    }

    isOtherReligion.value = !!(data.religion && !INDONESIAN_RELIGIONS.includes(data.religion))
    isOtherProvince.value = !!(data.province && !INDONESIAN_PROVINCES.includes(data.province))
  }
}, { immediate: true })

const handleReligionChange = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value
    if (val === 'OTHER') {
        isOtherReligion.value = true
        formData.value.religion = ''
    } else {
        isOtherReligion.value = false
        formData.value.religion = val
    }
}

const handleProvinceChange = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value
    if (val === 'Other') {
        isOtherProvince.value = true
        formData.value.province = ''
    } else {
        isOtherProvince.value = false
        formData.value.province = val
    }
}

const handleSubmit = () => {
    const payload = { ...formData.value }
    
    // Explicitly handle nulls for dates if empty string
    if (!payload.contractStartDate) payload.contractStartDate = null
    if (!payload.contractEndDate) payload.contractEndDate = null
    
    emit('submit', payload)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    
    <!-- Personal Info -->
    <div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20">
      <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Personal Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <UiInput label="First Name" v-model="formData.firstName" placeholder="John" />
        <UiInput label="Last Name" v-model="formData.lastName" placeholder="Doe" />
        <UiInput label="Date of Birth" type="date" v-model="formData.dateOfBirth" />
        
        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
           <select 
             v-model="formData.gender"
             class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
           >
             <option value="">Select Gender</option>
             <option v-for="g in Object.values(Gender)" :key="g" :value="g">{{ g.replace('_', ' ') }}</option>
           </select>
        </div>

        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
           <select 
             v-model="formData.maritalStatus"
             class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
           >
             <option value="">Select Status</option>
             <option v-for="s in Object.values(MaritalStatus)" :key="s" :value="s">{{ s.replace('_', ' ') }}</option>
           </select>
        </div>

        <UiInput label="Nationality" v-model="formData.nationality" placeholder="Indonesian" />

        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">Religion</label>
           <div v-if="!isOtherReligion">
              <select 
                @change="handleReligionChange"
                :value="formData.religion"
                class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
              >
                <option value="">Select Religion</option>
                <option v-for="r in INDONESIAN_RELIGIONS" :key="r" :value="r">{{ r }}</option>
              </select>
           </div>
           <div v-else class="flex gap-2">
              <UiInput v-model="formData.religion" placeholder="Specify religion" class="flex-1" />
              <UiButton type="button" variant="secondary" @click="isOtherReligion = false; formData.religion = ''" class="whitespace-nowrap">Show List</UiButton>
           </div>
        </div>

        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
           <select 
             v-model="formData.bloodType"
             class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
           >
             <option value="">Select</option>
             <option v-for="t in BLOOD_TYPES" :key="t" :value="t">{{ t }}</option>
           </select>
        </div>

        <UiInput label="ID Number (NIK)" v-model="formData.idNumber" />
        <UiInput label="Tax Number (NPWP)" v-model="formData.taxNumber" />
      </div>
    </div>

    <!-- Contact Info -->
    <div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20">
        <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Contact Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <UiInput label="Phone Number" v-model="formData.phoneNumber" placeholder="+62..." />
            <UiInput label="Alternative Phone" v-model="formData.alternativePhone" />
            
            <div class="md:col-span-2">
                <UiInput label="Address" v-model="formData.address" placeholder="Full address" />
            </div>
            
            <UiInput label="City" v-model="formData.city" />
            
            <div>
               <label class="block text-sm font-medium text-gray-700 mb-1">Province</label>
               <div v-if="!isOtherProvince">
                  <select 
                    @change="handleProvinceChange"
                    :value="formData.province"
                    class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
                  >
                    <option value="">Select Province</option>
                    <option v-for="p in INDONESIAN_PROVINCES" :key="p" :value="p">{{ p }}</option>
                  </select>
               </div>
               <div v-else class="flex gap-2">
                  <UiInput v-model="formData.province" placeholder="Specify province" class="flex-1" />
                  <UiButton type="button" variant="secondary" @click="isOtherProvince = false; formData.province = ''" class="whitespace-nowrap">Show List</UiButton>
               </div>
            </div>

            <UiInput label="Postal Code" v-model="formData.postalCode" />
            
            <div class="md:col-span-2 pt-4 mt-2 border-t border-gray-200">
                <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Emergency Contact</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <UiInput label="Name" v-model="formData.emergencyContactName" />
                    <UiInput label="Phone" v-model="formData.emergencyContactPhone" />
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                        <select 
                            v-model="formData.emergencyContactRelation"
                            class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
                        >
                            <option value="">Select Relation</option>
                            <option v-for="r in EMERGENCY_RELATIONS" :key="r" :value="r">{{ r }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Financial Info -->
    <div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20">
        <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Financial Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <UiInput label="Bank Name" v-model="formData.bankName" placeholder="BCA" />
            <UiInput label="Account Number" v-model="formData.bankAccountNumber" />
            <div class="md:col-span-2">
                <UiInput label="Account Holder Name" v-model="formData.bankAccountName" />
            </div>
        </div>
    </div>

    <!-- Admin Only -->
    <div v-if="isAdmin" class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20">
        <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Employment Details (Admin)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <UiInput label="Employee ID" v-model="formData.employeeNumber" />
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                <select 
                    v-model="formData.employmentStatus"
                    class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"
                >
                    <option value="">Select Status</option>
                    <option v-for="s in Object.values(EmploymentStatus)" :key="s" :value="s">{{ s }}</option>
                </select>
            </div>
            <UiInput label="Position" v-model="formData.position" />
            <UiInput label="Department" v-model="formData.department" />
            <UiInput label="Work Location" v-model="formData.workLocation" />
            <UiInput label="Join Date" type="date" v-model="formData.joinDate" />
            <UiInput label="Contract Start" type="date" v-model="formData.contractStartDate" />
            <UiInput label="Contract End" type="date" v-model="formData.contractEndDate" />
        </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <UiButton type="button" variant="secondary" @click="$emit('cancel')" :disabled="isLoading">
          <X class="w-4 h-4 mr-2" />
          Cancel
        </UiButton>
        <UiButton type="submit" :disabled="isLoading" class="bg-brand-navy text-white hover:bg-brand-navy/90">
          <Save class="w-4 h-4 mr-2" />
          {{ isLoading ? 'Saving...' : 'Save Changes' }}
        </UiButton>
    </div>

  </form>
</template>

<script setup lang="ts">
import { usePayslip, useDeletePayslip } from '@/composables/usePayslips' // Updated import path
import { useAuthStore } from '@/stores/auth'
import PayslipDetail from '@/components/payslips/PayslipDetail.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { data: payslip, loading, error } = usePayslip(id)
const { mutate: deletePayslip } = useDeletePayslip()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const isAdmin = computed(() => ['ADMIN', 'SUPER', 'HR'].includes(user.value?.role || ''))

const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this payslip? This action cannot be undone.')) {
        await deletePayslip(id, {
            onSuccess: () => {
                // Navigate back to history usually
                // Check referer or go to list
                router.push({ path: '..' }) // go up one level
            }
        })
    }
}
</script>

<template>
    <div class="px-4 py-8">
        <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
        </div>

        <div v-else-if="error" class="text-center py-12 text-red-500">
            Error loading payslip: {{ error.message }}
        </div>

        <PayslipDetail 
            v-else-if="payslip"
            :payslip="payslip"
            :isAdmin="isAdmin"
            @delete="handleDelete"
        />
        
        <div v-else class="text-center py-12 text-gray-500">
            Payslip not found.
        </div>
    </div>
</template>

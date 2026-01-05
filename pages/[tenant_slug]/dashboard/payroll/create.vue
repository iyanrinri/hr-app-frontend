<script setup lang="ts">
import CreatePayrollForm from '@/components/payroll/CreatePayrollForm.vue'
import { ArrowLeft } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()

const handleSuccess = () => {
    router.push({ path: '.' }) // Go back to index
}

const handleCancel = () => {
    router.back()
}
</script>

<template>
    <div class="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between">
            <div class="flex items-center min-w-0">
                <button @click="handleCancel" class="mr-4 text-gray-400 hover:text-gray-500">
                    <ArrowLeft class="w-6 h-6" />
                </button>
                <div>
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Create New Payroll
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                        Calculate salary and generate payroll entry
                    </p>
                </div>
            </div>
        </div>

        <CreatePayrollForm 
            @success="handleSuccess"
            @cancel="handleCancel"
        />
    </div>
</template>

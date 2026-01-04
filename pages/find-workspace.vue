<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { Users, Building2, ArrowRight, Quote } from 'lucide-vue-next'

// Nuxt auto-imports: useRouter, navigateTo, $fetch

const isChecking = ref(false)
const generalError = ref('')
const errors = ref({
  slug: ''
})
const form = ref({
  slug: ''
})

const workspaceSchema = z.object({
  slug: z.string().min(1, 'Workspace URL is required').regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers, and underscores are allowed'),
})

const onSubmit = async () => {
    // Reset errors
    errors.value.slug = ''
    generalError.value = ''
    
    // Validate
    const result = workspaceSchema.safeParse(form.value)
    if (!result.success) {
        errors.value.slug = result.error.format().slug?._errors[0] || ''
        return
    }

    isChecking.value = true

    try {
        await $fetch(`/api/tenant/${form.value.slug}`)
        // If success (200), redirect to login page
        await navigateTo(`/${form.value.slug}/auth/login`)
    } catch (error: any) {
        if (error.statusCode === 404) {
             errors.value.slug = 'Workspace not found. Please check your URL.'
        } else {
             console.error(error)
             generalError.value = 'Something went wrong. Please try again.'
        }
    } finally {
        isChecking.value = false
    }
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <!-- Left Side - Branding (Hidden on mobile) -->
    <div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-navy to-gray-900 p-12 text-white relative overflow-hidden">
      <!-- Abstract Background Shapes -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      <!-- Header -->
      <div class="relative z-10 flex items-center space-x-3">
        <div class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
          <Users class="w-6 h-6 text-brand-cyan" />
        </div>
        <span class="text-xl font-bold tracking-tight">HR Portal</span>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-lg">
        <h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          Find your <span class="text-brand-cyan">workspace</span>.
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8">
          Enter your company's workspace URL to verify your identity and access your dashboard safely.
        </p>
        
        <div class="flex items-center space-x-4 pt-4">
           <div class="flex -space-x-2">
             <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full bg-gray-600 border-2 border-brand-navy flex items-center justify-center text-xs font-medium">
                <span class="text-white/50">U{{ i }}</span>
             </div>
           </div>
           <div class="text-sm text-gray-400">
             <span class="font-bold text-white">Trust</span> by 2.5k+ companies
           </div>
        </div>
      </div>

      <!-- Footer/Testimonial -->
      <div class="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <Quote class="w-8 h-8 text-brand-cyan/50 mb-4" />
        <p class="text-gray-300 italic mb-4">
          "The security and ease of access provided by HR Portal is unmatched."
        </p>
        <div class="flex items-center">
           <div class="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3">
             AS
           </div>
           <div>
             <p class="text-sm font-bold text-white">Sarah Jenkins</p>
             <p class="text-xs text-gray-400">Operations Director</p>
           </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white">
      <div class="w-full max-w-md space-y-8">
        <!-- Mobile Logo (Visible only on mobile) -->
        <div class="lg:hidden flex justify-center mb-8">
          <div class="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6 text-white" />
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">Find your workspace</h2>
          <p class="mt-2 text-sm text-gray-600">
            We'll help you get to the right place
          </p>
        </div>

        <form @submit.prevent="onSubmit" class="mt-8 space-y-6 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">
          
             <!-- General Error Alert -->
          <div v-if="generalError" class="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
             {{ generalError }}
          </div>

          <div class="space-y-5">
            <UiInput
              label="Workspace URL"
              type="text"
              placeholder="company_slug"
              v-model="form.slug"
              :error="errors.slug"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            >
              <template #icon>
                <Building2 class="w-4 h-4 text-gray-400" />
              </template>
            </UiInput>
          </div>

          <UiButton
            type="submit"
            class="w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all"
            :is-loading="isChecking"
          >
            Continue <ArrowRight class="ml-2 w-4 h-4" />
          </UiButton>

          <div class="mt-6 text-center text-sm">
              <span class="text-gray-500">Don't have a workspace? </span>
              <NuxtLink to="/register" class="font-semibold text-brand-navy hover:text-brand-cyan transition-colors">
                Create new workspace
              </NuxtLink>
          </div>
        </form>

        <p class="text-center text-xs text-gray-400 mt-8">
          &copy; {{ new Date().getFullYear() }} HR Portal by NodeStudio. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

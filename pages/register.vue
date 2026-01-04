<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { Building2, Mail, Lock, User, Tag, ArrowRight, Quote, CheckCircle2 } from 'lucide-vue-next'

// Nuxt auto-imports: navigateTo, $fetch

const isPending = ref(false)
const generalError = ref('')
const errors = ref<Record<string, string>>({})

const form = ref({
  tenantName: '',
  slug: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  tenantName: z.string().min(2, 'Company name must be at least 2 characters'),
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9_]+$/, 'Slug must contain only lowercase letters, numbers, and underscores'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

const onSubmit = async () => {
  // Clear errors
  errors.value = {}
  generalError.value = ''

  // Validate
  const result = registerSchema.safeParse(form.value)
  if (!result.success) {
    const formattedErrors = result.error.format()
    // Map Zod errors to simple key-value object
    // Note: Zod format returns { key: { _errors: [] } }
    Object.entries(formattedErrors).forEach(([key, value]) => {
      if (key !== '_errors' && value && '_errors' in value) {
          errors.value[key] = (value as { _errors: string[] })._errors[0] || ''
      }
    })
    return
  }

  isPending.value = true
  
  try {
    // Prepare payload (exclude confirmPassword)
    const { confirmPassword, ...payload } = form.value
    
    const response = await $fetch<any>('/api/tenant/register', {
        method: 'POST',
        body: payload
    })

    // On success
    // Response likely follows standard format { data: { user: ..., token: ... } } or similar
    // React hook usage: const { user } = response.data; router.push(`/${user.tenantSlug}/auth/login`);
    // $fetch returns the parsed JSON info directly.
    const user = response.user || response.data?.user
    
    if (user && user.tenantSlug) {
         await navigateTo(`/${user.tenantSlug}/auth/login`)
    } else {
        // Fallback or if structure differs
        // Just redirect to find-workspace if we can't determine slug
        await navigateTo('/find-workspace')
    }

  } catch (error: any) {
    console.error(error)
    // Handle error message
    // Axios usually puts message in error.response.data.message
    // Nuxt $fetch error: error.data?.message
    generalError.value = error.data?.message || 'Registration failed. Please try again.'
  } finally {
    isPending.value = false
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
          <Building2 class="w-6 h-6 text-brand-cyan" />
        </div>
        <span class="text-xl font-bold tracking-tight">HR Portal</span>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-lg">
        <h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          Start managing your team <span class="text-brand-cyan">today</span>.
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8">
          Create your company workspace and get instant access to powerful HR management tools.
        </p>
        
        <div class="space-y-4">
          <div v-for="(feature, i) in [
            'Complete employee management system',
            'Attendance tracking & reporting',
            'Leave & overtime management',
            'Payroll & payslip generation',
          ]" :key="i" class="flex items-center space-x-3">
            <CheckCircle2 class="w-5 h-5 text-brand-cyan flex-shrink-0" />
            <span class="text-gray-300">{{ feature }}</span>
          </div>
        </div>
      </div>

      <!-- Footer/Testimonial -->
      <div class="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <Quote class="w-8 h-8 text-brand-cyan/50 mb-4" />
        <p class="text-gray-300 italic mb-4">
          "Setting up our HR system was incredibly easy. We were up and running in minutes!"
        </p>
        <div class="flex items-center">
           <div class="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3">
             SM
           </div>
           <div>
             <p class="text-sm font-bold text-white">Sarah Miller</p>
             <p class="text-xs text-gray-400">CEO, TechStart</p>
           </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Registration Form -->
    <div class="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white overflow-y-auto">
      <div class="w-full max-w-md space-y-8 py-8">
        <!-- Mobile Logo (Visible only on mobile) -->
        <div class="lg:hidden flex justify-center mb-8">
          <div class="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
            <Building2 class="w-6 h-6 text-white" />
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">Create Your Workspace</h2>
          <p class="mt-2 text-sm text-gray-600">
            Register your company and start managing your team
          </p>
        </div>

        <form @submit.prevent="onSubmit" class="mt-8 space-y-5 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">
          <!-- General Error Alert -->
          <div v-if="generalError" class="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
             {{ generalError }}
          </div>

          <!-- Company Information -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Company Information</h3>
            
            <UiInput
              label="Company Name"
              type="text"
              placeholder="Acme Corporation"
              v-model="form.tenantName"
              :error="errors.tenantName"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            >
                <template #icon>
                    <Building2 class="w-4 h-4 text-gray-400" />
                </template>
            </UiInput>
            
            <UiInput
              label="Company Slug"
              type="text"
              placeholder="acme_corp"
              v-model="form.slug"
              :error="errors.slug"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              helperText="Used in your workspace URL (lowercase, numbers, underscores only)"
            >
                <template #icon>
                    <Tag class="w-4 h-4 text-gray-400" />
                </template>
            </UiInput>
          </div>

          <!-- Admin Account -->
          <div class="space-y-4 pt-4">
            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Admin Account</h3>
            
            <div class="grid grid-cols-2 gap-4">
              <UiInput
                label="First Name"
                type="text"
                placeholder="John"
                v-model="form.firstName"
                :error="errors.firstName"
                class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              >
                <template #icon>
                    <User class="w-4 h-4 text-gray-400" />
                </template>
              </UiInput>
              
              <UiInput
                label="Last Name"
                type="text"
                placeholder="Doe"
                v-model="form.lastName"
                :error="errors.lastName"
                class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              >
                  <template #icon>
                    <User class="w-4 h-4 text-gray-400" />
                </template>
              </UiInput>
            </div>
            
            <UiInput
              label="Email Address"
              type="email"
              placeholder="admin@acme.com"
              v-model="form.email"
              :error="errors.email"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              autocomplete="email"
            >
                <template #icon>
                    <Mail class="w-4 h-4 text-gray-400" />
                </template>
            </UiInput>
            
            <UiInput
              label="Password"
              type="password"
              placeholder="••••••••"
              v-model="form.password"
              :error="errors.password"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
               autocomplete="new-password"
            >
                <template #icon>
                    <Lock class="w-4 h-4 text-gray-400" />
                </template>
            </UiInput>
            
            <UiInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              v-model="form.confirmPassword"
              :error="errors.confirmPassword"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
               autocomplete="new-password"
            >
                <template #icon>
                    <Lock class="w-4 h-4 text-gray-400" />
                </template>
            </UiInput>
          </div>

          <UiButton
            type="submit"
            class="w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all mt-6"
            :is-loading="isPending"
          >
            Create Workspace <ArrowRight class="ml-2 w-4 h-4" />
          </UiButton>

          <div class="mt-6 text-center text-sm">
             <span class="text-gray-500">Already have an account? </span>
             <NuxtLink to="/find-workspace" class="font-semibold text-brand-navy hover:text-brand-cyan transition-colors">
               Sign in to your workspace
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

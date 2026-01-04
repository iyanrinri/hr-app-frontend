<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useAuth } from "@/composables/useAuth";
import { Users, Mail, Lock, ArrowRight, Quote } from "lucide-vue-next";

// Page Meta
definePageMeta({
  layout: "auth",
});

const { login, loading } = useAuth();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const generalError = ref("");

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const onSubmit = async () => {
  // clear errors
  errors.value = { email: "", password: "" };
  generalError.value = "";

  // Validate
  const result = loginSchema.safeParse(form.value);
  if (!result.success) {
    const formattedErrors = result.error.format();
    errors.value.email = formattedErrors.email?._errors[0] || "";
    errors.value.password = formattedErrors.password?._errors[0] || "";
    return;
  }

  try {
    await login({
      email: form.value.email,
      password: form.value.password,
    });
  } catch (err: any) {
    generalError.value = err.message;
  }
};
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <!-- Left Side - Branding (Hidden on mobile) -->
    <div
      class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-navy to-gray-900 p-12 text-white relative overflow-hidden"
    >
      <!-- Abstract Background Shapes -->
      <div
        class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      ></div>

      <!-- Header -->
      <div class="relative z-10 flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20"
        >
          <Users class="w-6 h-6 text-brand-cyan" />
        </div>
        <span class="text-xl font-bold tracking-tight">HR Portal</span>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-lg">
        <h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          Manage your workforce with
          <span class="text-brand-cyan">confidence</span>.
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8">
          Access your personalized dashboard to manage leaves, track attendance,
          and stay connected with your team.
        </p>

        <div class="flex items-center space-x-4 pt-4">
          <div class="flex -space-x-2">
            <div
              v-for="i in 3"
              :key="i"
              class="w-10 h-10 rounded-full bg-gray-600 border-2 border-brand-navy flex items-center justify-center text-xs font-medium"
            >
              <span class="text-white/50">U{{ i }}</span>
            </div>
          </div>
          <div class="text-sm text-gray-400">
            <span class="font-bold text-white">2.5k+</span> employees active
            daily
          </div>
        </div>
      </div>

      <!-- Footer/Testimonial -->
      <div
        class="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
      >
        <Quote class="w-8 h-8 text-brand-cyan/50 mb-4" />
        <p class="text-gray-300 italic mb-4">
          "This platform has transformed how we handle HR operations. It's
          intuitive, fast, and reliable."
        </p>
        <div class="flex items-center">
          <div
            class="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3"
          >
            JD
          </div>
          <div>
            <p class="text-sm font-bold text-white">John Doe</p>
            <p class="text-xs text-gray-400">HR Manager</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div
      class="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white"
    >
      <div class="w-full max-w-md space-y-8">
        <!-- Mobile Logo (Visible only on mobile) -->
        <div class="lg:hidden flex justify-center mb-8">
          <div
            class="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center"
          >
            <Users class="w-6 h-6 text-white" />
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Please enter your details to sign in
          </p>
        </div>

        <form
          @submit.prevent="onSubmit"
          class="mt-8 space-y-6 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50"
        >
          <!-- General Error Alert -->
          <div
            v-if="generalError"
            class="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600"
          >
            {{ generalError }}
          </div>

          <div class="space-y-5">
            <UiInput
              label="Email address"
              type="email"
              placeholder="name@company.com"
              v-model="form.email"
              :error="errors.email"
              :disabled="loading"
              class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            >
              <template #icon>
                <Mail class="w-4 h-4 text-gray-400" />
              </template>
            </UiInput>

            <div class="space-y-1">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <NuxtLink
                  to="#"
                  class="text-xs font-medium text-brand-navy hover:text-brand-cyan hover:underline"
                >
                  Forgot password?
                </NuxtLink>
              </div>
              <div class="relative">
                <UiInput
                  type="password"
                  placeholder="••••••••"
                  v-model="form.password"
                  :error="errors.password"
                  :disabled="loading"
                  class="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                >
                  <template #icon>
                    <Lock class="w-4 h-4 text-gray-400" />
                  </template>
                </UiInput>
              </div>
            </div>
          </div>

          <UiButton
            type="submit"
            class="w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all"
            :is-loading="loading"
          >
            Sign In <ArrowRight class="ml-2 w-4 h-4" />
          </UiButton>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Secure login</span>
            </div>
          </div>
        </form>

        <p class="text-center text-xs text-gray-400 mt-8">
          &copy; {{ new Date().getFullYear() }} HR Portal by NodeStudio. All
          rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

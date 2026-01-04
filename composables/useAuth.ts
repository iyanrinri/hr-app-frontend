import { useAuthStore } from '@/stores/auth'
import type { LoginResponse, RegisterPayload, TenantRegisterPayload, TenantRegisterResponse } from '@/types/auth'

// In Nuxt, we can use useFetch or just plain $fetch. 
// For better control matching your axiom setup, we can use a custom composable or $fetch with interceptors 
// OR just port axios. But Nuxt native way is preferred.

// Composable for Auth Logic
export const useAuth = () => {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const { $api } = useNuxtApp() // Assuming we will create a plugin for api

    const loading = ref(false)

    const login = async (payload: { email: string; password: string }) => {
        const tenantSlug = route.params.tenant_slug as string
        loading.value = true
        try {
            // Using a simple fetch wrapper or axios
            // We need to implement the API service first, but for now assuming direct call logic
            const response = await $fetch<LoginResponse>('/api/auth/login', {
                method: 'POST',
                body: payload,
                // Nuxt proxy will handle /api -> backend
            })

            const { access_token, user } = response
            authStore.setAuth(access_token, user)
            
            // Cookie is set by store automatically
            
            // Redirect
            const redirectPath = tenantSlug ? `/${tenantSlug}/dashboard` : '/dashboard'
            navigateTo(redirectPath)
            
            // Simple alert/toast (we can add a Toast library later)
            // console.log('Logged in successfully') 
        } catch (error: any) {
             const message = error.data?.message || 'Login failed'
             throw new Error(message)
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        const tenantSlug = route.params.tenant_slug as string
        authStore.clearAuth()
        const redirectPath = tenantSlug ? `/${tenantSlug}/auth/login` : '/auth/login'
        return navigateTo(redirectPath)
    }

    return {
        login,
        logout,
        loading
    }
}

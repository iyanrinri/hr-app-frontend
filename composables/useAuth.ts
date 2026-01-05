import { useAuthStore } from '@/stores/auth'
import type { LoginResponse } from '@/types/auth'

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
            // Construct URL with tenant_slug if available
            const url = tenantSlug 
                ? `/api/${tenantSlug}/auth/login` 
                : '/api/auth/login'

            const response = await $fetch<LoginResponse>(url, {
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

    const logout = async () => {
        const tenantSlug = route.params.tenant_slug as string
        
        try {
             const url = tenantSlug 
                ? `/api/${tenantSlug}/auth/logout` 
                : '/api/auth/logout'

             // We attempt to call the backend logout
             // We don't block heavily on this, but we try to execute it.
             await $fetch(url, {
                 method: 'POST'
             })
        } catch (error) {
            console.error('Logout API call failed', error)
            // We continue to client-side logout anyway
        } finally {
            authStore.clearAuth()
            const redirectPath = tenantSlug ? `/${tenantSlug}/auth/login` : '/auth/login'
            return navigateTo(redirectPath) 
        }
    }

    return {
        login,
        logout,
        loading
    }
}

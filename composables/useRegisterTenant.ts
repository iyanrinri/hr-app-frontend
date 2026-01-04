import { useAuthStore } from '@/stores/auth'
import type { TenantRegisterPayload } from '@/types/auth'

export const useRegisterTenant = () => {
    const { $fetch } = useNuxtApp()
    const loading = ref(false)
    const router = useRouter()
    
    // We don't generally store state for registration, simply execute and redirect
    const registerTenant = async (payload: TenantRegisterPayload) => {
        loading.value = true
        try {
            // Adjust API endpoint to match Next.js proxy rewrite or direct backend
            // In Next.js: api.post('/tenant/register', payload) -> /api/tenant/register
            const response = await $fetch<{ user: { tenantSlug: string, firstName: string } }>('/api/tenant/register', {
                method: 'POST',
                body: payload
            })
            
            const { user } = response
            // Maybe show a toast
            // toast.success(`Workspace registered successfully! Welcome, ${user.firstName}!`)
            
            // Redirect to that tenant's login
            navigateTo(`/${user.tenantSlug}/auth/login`)
            
        } catch (error: any) {
             const message = error.data?.message || 'Registration failed'
             throw new Error(message)
        } finally {
            loading.value = false
        }
    }

    return {
        registerTenant,
        loading
    }
}

import type { Holiday } from '@/types/attendance-period'
import { useAuthStore } from '@/stores/auth'

// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

export const useHolidays = (attendancePeriodId: MaybeRef<string>) => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    
    const { data, pending, error, refresh } = useFetch<Holiday[]>(() => getUrl('/attendance-periods/holidays/list'), {
        key: `holidays-${unref(attendancePeriodId)}`,
        query: computed(() => ({ attendancePeriodId: unref(attendancePeriodId) })),
        immediate: !!unref(attendancePeriodId),
        headers: computed(() => ({
            Authorization: `Bearer ${authStore.token}`
        }))
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useCreateHoliday = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    const loading = ref(false)

    const mutate = async (data: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => {
        loading.value = true
        try {
            await $fetch(getUrl('/attendance-periods/holidays'), {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            })
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        mutate,
        loading
    }
}

export const useUpdateHoliday = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    const loading = ref(false)

    const mutate = async (id: string, data: Partial<Holiday>) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/attendance-periods/holidays/${id}`), {
                method: 'PATCH',
                body: data,
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            })
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        mutate,
        loading
    }
}

export const useDeleteHoliday = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    const loading = ref(false)

    const mutate = async (id: string) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/attendance-periods/holidays/${id}`), {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            })
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        mutate,
        loading
    }
}

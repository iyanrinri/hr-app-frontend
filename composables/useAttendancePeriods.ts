import type { 
    AttendancePeriod, 
    AttendancePeriodsResponse 
} from '@/types/attendance-period'
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

export const useAttendancePeriods = (
    page: MaybeRef<number> = 1, 
    limit: MaybeRef<number> = 10, 
    search: MaybeRef<string> = '', 
    isActive: MaybeRef<string> = ''
) => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()

    const queryParams = computed(() => {
        const params: Record<string, any> = {
            page: unref(page),
            limit: unref(limit)
        }
        if (unref(search)) params.search = unref(search)
        if (unref(isActive)) params.isActive = unref(isActive)
        return params
    })

    const { data, pending, error, refresh } = useFetch<AttendancePeriodsResponse>(() => getUrl('/attendance-periods'), {
        key: 'attendance-periods',
        query: queryParams,
        watch: [queryParams],
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

export const useAttendancePeriod = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()

    const { data, pending, error, refresh } = useFetch<AttendancePeriod>(() => getUrl(`/attendance-periods/${unref(id)}`), {
        key: `attendance-period-${unref(id)}`,
        immediate: !!unref(id),
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

export const useActivePeriod = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()

    const { data, pending, error, refresh } = useFetch<AttendancePeriod>(() => getUrl('/attendance-periods/active'), {
        key: 'attendance-period-active',
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

export const useCreateAttendancePeriod = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    const loading = ref(false)

    const mutate = async (data: Omit<AttendancePeriod, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {
        loading.value = true
        try {
            await $fetch(getUrl('/attendance-periods'), {
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

export const useUpdateAttendancePeriod = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    const loading = ref(false)

    const mutate = async (id: string, data: Partial<AttendancePeriod>) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/attendance-periods/${id}`), {
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

export const useDeleteAttendancePeriod = () => {
    const getUrl = useTenantUrl()
    const authStore = useAuthStore()
    const loading = ref(false)

    const mutate = async (id: string) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/attendance-periods/${id}`), {
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

import type { 
    OvertimeRequest, 
    CreateOvertimePayload,
    UpdateOvertimePayload,
    OvertimeListResponse,
    OvertimeFilters
} from '@/types/overtime'

// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

// --- Overtime Requests (CRUD) ---

export const useOvertimeRequests = (filters: MaybeRef<OvertimeFilters> = {}) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        const params: Record<string, any> = {}
        if (f.skip !== undefined) params.skip = f.skip
        if (f.take !== undefined) params.take = f.take
        if (f.status) params.status = f.status
        if (f.startDate) params.startDate = f.startDate
        if (f.endDate) params.endDate = f.endDate
        if (f.employeeId) params.employeeId = f.employeeId
        return params
    })

    const { data, pending, error, refresh } = useFetch<OvertimeListResponse>(() => getUrl('/overtime-requests'), {
        key: 'overtime-requests',
        query: queryParams,
        watch: [queryParams],
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useOvertimeRequestDetail = (id: MaybeRef<string | number>) => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<OvertimeRequest>(() => getUrl(`/overtime-requests/${unref(id)}`), {
        key: `overtime-request-${unref(id)}`,
        immediate: !!unref(id),
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useCreateOvertimeRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: CreateOvertimePayload, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl('/overtime-requests'), {
                method: 'POST',
                body: payload
            })
            if (options?.onSuccess) options.onSuccess()
        } catch (error) {
            if (options?.onError) options.onError(error)
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

export const useUpdateOvertimeRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: string | number, payload: UpdateOvertimePayload, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/overtime-requests/${id}`), {
                method: 'PATCH',
                body: payload
            })
            if (options?.onSuccess) options.onSuccess()
        } catch (error) {
            if (options?.onError) options.onError(error)
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

export const useDeleteOvertimeRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: string | number) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/overtime-requests/${id}`), {
                method: 'DELETE'
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

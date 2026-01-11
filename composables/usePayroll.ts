import type { 
    Payroll, 
    CreatePayrollRequest,
    PayrollFilters,
    PayrollListResponse,
    ProcessPayrollRequest,
    PayrollSummary,
    BulkGeneratePayrollRequest,
    BulkGeneratePayrollResponse 
} from '@/types/payroll'

const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

export const usePayrolls = (filters: MaybeRef<PayrollFilters> = {}) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        return { ...f }
    })

    const { data, pending, error, refresh } = useFetch<PayrollListResponse>(() => getUrl('/payroll'), {
        key: 'payrolls',
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

export const useMyPayrolls = (filters: MaybeRef<Partial<PayrollFilters>> = {}) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        return { ...f }
    })

    const { data, pending, error, refresh } = useFetch<PayrollListResponse>(() => getUrl('/payroll/my'), {
        key: 'my-payrolls',
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

export const usePayroll = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<Payroll>(() => getUrl(`/payroll/${unref(id)}`), {
        key: `payroll-${unref(id)}`,
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

export const usePayrollSummary = (employeeId?: MaybeRef<string>) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const eid = unref(employeeId)
        return eid ? { employeeId: eid } : {}
    })

    const { data, pending, error, refresh } = useFetch<PayrollSummary>(() => getUrl('/payroll/summary'), {
        key: `payroll-summary-${unref(employeeId) || 'all'}`,
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

export const useCreatePayroll = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: CreatePayrollRequest, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl('/payroll'), {
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

export const useProcessPayrolls = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: ProcessPayrollRequest, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl('/payroll/process'), {
                method: 'PUT',
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

export const useMarkPayrollPaid = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: string, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/payroll/${id}/mark-paid`), {
                method: 'PUT'
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

export const useBulkGeneratePayroll = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)
    const error = ref<any>(null)
    const data = ref<BulkGeneratePayrollResponse | null>(null)

    const mutate = async (payload: BulkGeneratePayrollRequest, options?: { onSuccess?: (data: BulkGeneratePayrollResponse) => void, onError?: (error: any) => void }) => {
        loading.value = true
        error.value = null
        try {
            const res = await $fetch<BulkGeneratePayrollResponse>(getUrl('/payroll/bulk-generate'), {
                method: 'POST',
                body: payload
            })
            data.value = res
            if (options?.onSuccess) options.onSuccess(res)
        } catch (e) {
            error.value = e
            if (options?.onError) options.onError(e)
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        mutate,
        loading,
        data,
        error
    }
}

export const useDeletePayroll = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: string, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/payroll/${id}`), {
                method: 'DELETE'
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

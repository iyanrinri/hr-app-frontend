import type { 
    Payslip, 
    GeneratePayslipRequest, 
    PayslipListResponse 
} from '@/types/payslip'

const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

export const usePayslips = (filters: MaybeRef<any> = {}) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        return { ...f }
    })

    const { data, pending, error, refresh } = useFetch<PayslipListResponse>(() => getUrl('/payslip'), {
        key: 'payslips',
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

export const usePayslip = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<Payslip>(() => getUrl(`/payslip/${unref(id)}`), {
        key: `payslip-${unref(id)}`,
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

export const useMyPayslips = () => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<Payslip[]>(() => getUrl('/payslip/my/history'), {
        key: 'my-payslips',
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useGeneratePayslip = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: GeneratePayslipRequest, options?: { onSuccess?: (data: Payslip) => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            const res = await $fetch<Payslip>(getUrl('/payslip/generate'), {
                method: 'POST',
                body: payload
            })
            if (options?.onSuccess) options.onSuccess(res)
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

export const usePayslipByPayroll = (payrollId: MaybeRef<string>) => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<Payslip>(() => getUrl(`/payslip/by-payroll/${unref(payrollId)}`), {
        key: `payslip-payroll-${unref(payrollId)}`,
        immediate: !!unref(payrollId),
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useDeletePayslip = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: string, options?: { onSuccess?: () => void, onError?: (error: any) => void }) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/payslip/${id}`), {
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

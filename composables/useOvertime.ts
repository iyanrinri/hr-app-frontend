import type { 
    OvertimeRequest, 
    OvertimeListResponse, 
    OvertimeApprovalStats, 
    OvertimeFilters, 
    ApproverType, 
    OvertimeApprovalProcessPayload,
    EmployeeOvertimeHistoryFilters,
    TotalHoursFilters,
    TotalHoursResponse
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

// --- Approvals List ---

export const useOvertimeApprovals = (filters: MaybeRef<OvertimeFilters>) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        const params: Record<string, any> = {}
        if (f.skip !== undefined) params.skip = f.skip
        if (f.take !== undefined) params.take = f.take
        if (f.status) params.status = f.status
        if (f.startDate) params.startDate = f.startDate
        if (f.endDate) params.endDate = f.endDate
        if (f.approverId) params.approverId = f.approverId
        if (f.approverType) params.approverType = f.approverType
        return params
    })

    const { data, pending, error, refresh } = useFetch<OvertimeListResponse>(() => getUrl('/overtime-approvals'), {
        key: 'overtime-approvals',
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

// --- Pending Approvals ---

export const usePendingOvertimeApprovals = (approverType?: MaybeRef<ApproverType>) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const type = unref(approverType)
        return type ? { approverType: type } : {}
    })

    const { data, pending, error, refresh } = useFetch<OvertimeRequest[]>(() => getUrl('/overtime-approvals/pending'), {
        key: `overtime-approvals-pending-${unref(approverType)}`,
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

// --- Approval Statistics ---

export const useOvertimeApprovalStats = (filters?: MaybeRef<{ approverId?: number; startDate?: string; endDate?: string }>) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters) || {}
        const params: Record<string, any> = {}
        if (f.approverId) params.approverId = f.approverId
        if (f.startDate) params.startDate = f.startDate
        if (f.endDate) params.endDate = f.endDate
        return params
    })

    const { data, pending, error, refresh } = useFetch<OvertimeApprovalStats>(() => getUrl('/overtime-approvals/stats'), {
        key: 'overtime-approvals-stats',
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

// --- Process Approval (Approve/Reject) ---

export const useProcessOvertimeApproval = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: OvertimeApprovalProcessPayload) => {
        loading.value = true
        try {
            await $fetch(getUrl('/overtime-approvals/process'), {
                method: 'POST',
                body: payload
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

// --- Admin Features ---

export const useEmployeeOvertimeHistory = (
    employeeId: MaybeRef<string | number>,
    filters: MaybeRef<EmployeeOvertimeHistoryFilters> = {}
) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        const params: Record<string, any> = {}
        if (f.skip !== undefined) params.skip = f.skip
        if (f.take !== undefined) params.take = f.take
        if (f.status) params.status = f.status
        if (f.startDate) params.startDate = f.startDate
        if (f.endDate) params.endDate = f.endDate
        return params
    })

    const { data, pending, error, refresh } = useFetch<OvertimeListResponse>(() => getUrl(`/overtime-requests/employee/${unref(employeeId)}/history`), {
        key: `employee-overtime-history-${unref(employeeId)}`,
        query: queryParams,
        watch: [queryParams],
        immediate: !!unref(employeeId),
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useEmployeeTotalHours = (
    employeeId: MaybeRef<string | number>,
    filters: MaybeRef<TotalHoursFilters>
) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const f = unref(filters)
        const params: Record<string, any> = {
            startDate: f.startDate,
            endDate: f.endDate
        }
        if (f.status) params.status = f.status
        return params
    })

    const { data, pending, error, refresh } = useFetch<TotalHoursResponse>(() => getUrl(`/overtime-requests/employee/${unref(employeeId)}/total-hours`), {
        key: `employee-total-hours-${unref(employeeId)}`,
        query: queryParams,
        watch: [queryParams],
        immediate: !!(unref(employeeId) && unref(filters).startDate && unref(filters).endDate),
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

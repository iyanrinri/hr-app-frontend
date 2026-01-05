import type { 
    LeavePeriod, 
    LeavePeriodsResponse, 
    CreateLeavePeriodPayload,
    UpdateLeavePeriodPayload,
    LeaveType,
    CreateLeaveTypePayload,
    UpdateLeaveTypePayload,
    LeaveRequestFilters,
    AssignLeavePayload,
    LeaveBalance
 } from '@/types/leaves'

// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

// --- Leave Periods ---

export const useLeavePeriods = (
    page: MaybeRef<number> = 1, 
    limit: MaybeRef<number> = 10, 
    activeOnly: MaybeRef<boolean> = false
) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => ({
        page: unref(page),
        limit: unref(limit),
        activeOnly: unref(activeOnly)
    }))

    const { data, pending, error, refresh } = useFetch<LeavePeriodsResponse>(() => getUrl('/leave-periods'), {
        key: 'leave-periods',
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

export const useLeavePeriod = (id: MaybeRef<string | number>) => {
     const getUrl = useTenantUrl()

     const { data, pending, error, refresh } = useFetch<LeavePeriod>(() => getUrl(`/leave-periods/${unref(id)}`), {
        key: `leave-period-${unref(id)}`,
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

export const useActiveLeavePeriod = () => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<LeavePeriod>(() => getUrl('/leave-periods/active'), {
       key: 'leave-period-active',
       server: false
   })

   return {
       data,
       loading: pending,
       error,
       refresh
   }
}

export const useCreateLeavePeriod = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: CreateLeavePeriodPayload) => {
        loading.value = true
        try {
            await $fetch(getUrl('/leave-periods'), {
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

export const useUpdateLeavePeriod = () => {
     const getUrl = useTenantUrl()
     const loading = ref(false)
 
     const mutate = async (id: string | number, payload: UpdateLeavePeriodPayload) => {
         loading.value = true
         try {
             await $fetch(getUrl(`/leave-periods/${id}`), {
                 method: 'PATCH',
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

export const useDeleteLeavePeriod = () => {
     const getUrl = useTenantUrl()
     const loading = ref(false)
 
     const mutate = async (id: string | number) => {
         loading.value = true
         try {
             await $fetch(getUrl(`/leave-periods/${id}`), {
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

// --- Leave Types ---

export const useLeaveTypes = (leavePeriodId?: MaybeRef<number | undefined>) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const pid = unref(leavePeriodId)
        return pid ? { leavePeriodId: pid } : {}
    })

    const { data, pending, error, refresh } = useFetch<LeaveType[]>(() => getUrl('/leave-types'), {
        key: `leave-types-${unref(leavePeriodId)}`,
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

export const useCreateLeaveType = () => {
     const getUrl = useTenantUrl()
     const loading = ref(false)
 
     const mutate = async (payload: CreateLeaveTypePayload) => {
         loading.value = true
         try {
             await $fetch(getUrl('/leave-types'), {
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

export const useUpdateLeaveType = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: number, payload: UpdateLeaveTypePayload) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/leave-types/${id}`), {
                method: 'PATCH',
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

export const useDeleteLeaveType = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: number) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/leave-types/${id}`), {
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

// --- Leave Requests ---

export const useMyLeaveRequests = (filters: MaybeRef<LeaveRequestFilters>) => {
    const getUrl = useTenantUrl()
    
    const queryParams = computed(() => {
        const f = unref(filters)
        const params: Record<string, any> = {}
        if (f.page) params.page = f.page
        if (f.limit) params.limit = f.limit
        if (f.startDate) params.startDate = f.startDate
        if (f.endDate) params.endDate = f.endDate
        if (f.status && f.status.length > 0) {
            // Nuxt/h3 might handle arrays automatically as status=A&status=B, or we stick to array
             params.status = f.status
        }
        return params
    })

    const { data, pending, error, refresh } = useFetch<any>(() => getUrl('/leave-requests/my'), {
        key: 'my-leave-requests',
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

export const useLeaveRequest = (id: MaybeRef<number | string>) => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<any>(() => getUrl(`/leave-requests/${unref(id)}`), {
        key: `leave-request-${unref(id)}`,
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

export const useCreateLeaveRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: AssignLeavePayload) => {
        loading.value = true
        try {
            await $fetch(getUrl('/leave-requests'), {
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

export const useCancelLeaveRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: number | string) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/leave-requests/${id}/cancel`), {
                method: 'PATCH'
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

// --- Approvals ---

export const usePendingApprovals = () => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<any>(() => getUrl('/leave-requests/pending/for-approval'), {
        key: 'pending-approvals',
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useApproveLeaveRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: number | string, comments?: string) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/leave-requests/${id}/approve`), {
                method: 'PATCH',
                body: { comments }
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

export const useRejectLeaveRequest = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (id: number | string, comments?: string) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/leave-requests/${id}/reject`), {
                method: 'PATCH',
                body: { comments }
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

// --- Balances ---

export const useMyLeaveBalances = () => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<LeaveBalance[]>(() => getUrl('/leave-balances/my'), {
        key: 'my-leave-balances',
        server: false
    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

export const useEmployeeLeaveBalances = (employeeId: MaybeRef<number | string>) => {
    const getUrl = useTenantUrl()

    const { data, pending, error, refresh } = useFetch<LeaveBalance[]>(() => getUrl(`/leave-balances/employee/${unref(employeeId)}`), {
        key: `employee-leave-balances-${unref(employeeId)}`,
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

import type { 
    Employee, 
    EmployeesResponse, 
    CreateEmployeePayload, 
    AssignManagerPayload,
    AssignSubordinatesPayload,
    OrganizationTreeResponse
} from '@/types/employee'


// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

export const useEmployees = (
    page: MaybeRef<number> = 1, 
    limit: MaybeRef<number> = 10, 
    search: MaybeRef<string> = '', 
    status: MaybeRef<string> = ''
) => {
    const getUrl = useTenantUrl()


    const queryParams = computed(() => {
        const params: Record<string, any> = {
            paginated: 1,
            page: unref(page),
            limit: unref(limit)
        }
        if (unref(search)) params.search = unref(search)
        if (unref(status)) params.status = unref(status)
        return params
    })

    const { data, pending, error, refresh } = useFetch<EmployeesResponse>(() => getUrl('/employees'), {
        key: 'employees',
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

export const useAllEmployees = () => {
    const getUrl = useTenantUrl()


    // Stable query parameters
    const queryParams = { paginated: 0 }

    const { data, pending, error, refresh } = useFetch<EmployeesResponse>(() => getUrl('/employees'), {
        key: 'all-employees',
        query: queryParams,
        server: false
    })

    // Helper to get raw array since API might return { data: [...] } or just [...] depend on implementation
    const employees = computed(() => {
        if (!data.value) return []
        if (Array.isArray(data.value)) return data.value
        return data.value.data || []
    })

    return {
        data: employees,
        loading: pending,
        error,
        refresh
    }
}

export const useEmployee = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()


    const { data, pending, error, refresh } = useFetch<Employee>(() => getUrl(`/employees/${unref(id)}`), {
        key: `employee-${unref(id)}`,
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

export const useCreateEmployee = () => {
    const getUrl = useTenantUrl()

    const loading = ref(false)

    const mutate = async (payload: CreateEmployeePayload) => {
        loading.value = true
        try {
            await $fetch(getUrl('/employees'), {
                method: 'POST',
                body: payload,

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

export const useUpdateEmployee = () => {
    const getUrl = useTenantUrl()

    const loading = ref(false)

    const mutate = async (id: string, payload: Partial<Employee>) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/employees/${id}`), {
                method: 'PUT',
                body: payload,

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

export const useDeleteEmployee = () => {
    const getUrl = useTenantUrl()

    const loading = ref(false)

    const mutate = async (id: string) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/employees/${id}`), {
                method: 'DELETE',

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

export const useRestoreEmployee = () => {
     const getUrl = useTenantUrl()

     const loading = ref(false)
 
     const mutate = async (id: string) => {
         loading.value = true
         try {
             await $fetch(getUrl(`/employees/${id}/restore`), {
                 method: 'PATCH',

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

// --- Hierarchy Management Hooks ---

export const useAssignManager = () => {
    const getUrl = useTenantUrl()

    const loading = ref(false)

    const mutate = async (id: string, data: AssignManagerPayload) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/employees/${id}/manager`), {
                method: 'PUT',
                body: data,

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

export const useAssignSubordinates = () => {
    const getUrl = useTenantUrl()

    const loading = ref(false)

    const mutate = async (id: string, data: AssignSubordinatesPayload) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/employees/${id}/subordinates`), {
                method: 'POST',
                body: data,

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

export const useManagementChain = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()


    const { data, pending, error, refresh } = useFetch<Employee[]>(() => getUrl(`/employees/${unref(id)}/management-chain`), {
        key: `employee-chain-${unref(id)}`,
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

export const useSubordinates = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()


    const { data, pending, error, refresh } = useFetch<Employee[]>(() => getUrl(`/employees/${unref(id)}/subordinates`), {
        key: `employee-subordinates-${unref(id)}`,
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

export const useOrganizationTree = (id: MaybeRef<string>) => {
    const getUrl = useTenantUrl()


    const { data, pending, error, refresh } = useFetch<OrganizationTreeResponse>(() => getUrl(`/employees/${unref(id)}/organization-tree`), {
        key: `employee-tree-${unref(id)}`,
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

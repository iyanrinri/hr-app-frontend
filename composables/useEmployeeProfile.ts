import type { EmployeeProfile, UpdateProfilePayload } from '@/types/employee'


// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

// --- My Profile ---

export const useMyProfile = () => {
  const getUrl = useTenantUrl()


  const { data, pending, error, refresh } = useFetch<EmployeeProfile>(() => getUrl('/employees/profile/me'), {
    key: 'profile-me',

  })

  return {
    data,
    loading: pending,
    error,
    refresh
  }
}

export const useUpdateMyProfile = () => {
  const getUrl = useTenantUrl()

  const loading = ref(false)

  const mutate = async (data: UpdateProfilePayload) => {
    loading.value = true
    try {
      const response = await $fetch<EmployeeProfile>(getUrl('/employees/profile/me'), {
        method: 'PATCH',
        body: data,

      })
      return response
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

// --- Employee Profile (Admin/Manager Access) ---

export const useEmployeeProfile = (id: MaybeRef<string>) => {
  const getUrl = useTenantUrl()


  const { data, pending, error, refresh } = useFetch<EmployeeProfile>(() => getUrl(`/employees/${unref(id)}/profile`), {
    key: `employee-profile-${unref(id)}`,
    immediate: !!unref(id),

  })

  return {
    data,
    loading: pending,
    error,
    refresh
  }
}

export const useUpdateEmployeeProfile = () => {
  const getUrl = useTenantUrl()

  const loading = ref(false)

  const mutate = async (id: string, data: UpdateProfilePayload) => {
    loading.value = true
    try {
      const response = await $fetch<EmployeeProfile>(getUrl(`/employees/${id}/profile`), {
        method: 'PATCH',
        body: data,

      })
      return response
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

// --- Profile Picture Hooks ---

export const useUploadEmployeePicture = () => {
  const getUrl = useTenantUrl()

  const loading = ref(false)

  const mutate = async (id: string, file: File) => {
    loading.value = true
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await $fetch<{ url: string }>(getUrl(`/employees/${id}/picture`), {
        method: 'POST',
        body: formData,

      })
      return response
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

export const useDeleteEmployeePicture = () => {
    const getUrl = useTenantUrl()

    const loading = ref(false)
  
    const mutate = async (id: string) => {
      loading.value = true
      try {
        await $fetch(getUrl(`/employees/${id}/picture`), {
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

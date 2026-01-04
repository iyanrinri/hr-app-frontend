import { useAuthStore } from '@/stores/auth'

export const useFetchWithAuth = <T>(url: string | (() => string), options: any = {}) => {
  const authStore = useAuthStore()
  
  const defaults = {
    headers: {
      Authorization: authStore.token ? `Bearer ${authStore.token}` : undefined
    }
  }

  // Merge headers
  if (options.headers) {
    defaults.headers = { ...defaults.headers, ...options.headers }
  }

  return useFetch<T>(url, {
    ...options,
    headers: defaults.headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.clearAuth()
        // redirect to login?
      }
    }
  })
}

// Also export a non-composable version for direct $fetch usage if needed
export const $fetchWithAuth = async <T>(url: string, options: any = {}) => {
  const authStore = useAuthStore()
  // Note: accessing store outside component setup might require pinia instance passing or ensuring setup
  // Safer to use inside composables or components

  const headers = {
    Authorization: authStore.token ? `Bearer ${authStore.token}` : undefined,
    ...options.headers
  }

  return $fetch<T>(url, {
    ...options,
    headers
  })
}

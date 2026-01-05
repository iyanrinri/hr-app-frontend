import type { SettingsResponse, UpdateSettingPayload, SettingCategory } from '@/types/settings'

// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

export const useSettings = (
    page: MaybeRef<number> = 1,
    limit: MaybeRef<number> = 20,
    category?: MaybeRef<SettingCategory | undefined>,
    isPublic?: MaybeRef<boolean | undefined>
) => {
    const getUrl = useTenantUrl()

    const queryParams = computed(() => {
        const params: Record<string, any> = {
            page: unref(page),
            limit: unref(limit)
        }
        if (unref(category)) params.category = unref(category)
        if (unref(isPublic) !== undefined) params.isPublic = unref(isPublic)
        return params
    })

    const key = computed(() => `settings-${unref(page)}-${unref(limit)}-${unref(category)}-${unref(isPublic)}`)

    const { data, pending, error, refresh } = useFetch<SettingsResponse>(() => getUrl('/settings'), {
        key: key.value,
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

export const useUpdateSetting = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async (payload: UpdateSettingPayload) => {
        loading.value = true
        try {
            await $fetch(getUrl(`/settings/${payload.key}`), {
                method: 'PATCH',
                body: { value: payload.value }
            })
            // Invalidate ALL settings queries to refresh UI
            // This key matching logic invalidates any useFetch with key starting with "settings-"
            refreshNuxtData((key) => typeof key === 'string' && key.startsWith('settings-'))
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

export const useInitializeSettings = () => {
    const getUrl = useTenantUrl()
    const loading = ref(false)

    const mutate = async () => {
        loading.value = true
        try {
            await $fetch(getUrl('/settings/initialize'), {
                method: 'POST'
            })
            refreshNuxtData((key) => typeof key === 'string' && key.startsWith('settings-'))
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

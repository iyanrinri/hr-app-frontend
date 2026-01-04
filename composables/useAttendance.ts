import type { Attendance, AttendanceHistory, AttendanceStats, ClockInOutPayload, TodayAttendanceDashboard } from '@/types/attendance'


// Helper to construct URL with tenant slug
const useTenantUrl = () => {
  const route = useRoute()
  const tenantSlug = route.params.tenant_slug as string
  
  return (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
  }
}

export const useClockIn = () => {
  const getUrl = useTenantUrl()

  const loading = ref(false)
  
  const mutate = async (payload: ClockInOutPayload) => {
    loading.value = true
    try {
      const data = await $fetch(getUrl('/attendance/clock-in'), {
        method: 'POST',
        body: payload,

      })
      return data
    } catch (error: any) {
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

export const useClockOut = () => {
  const getUrl = useTenantUrl()

  const loading = ref(false)

  const mutate = async (payload: ClockInOutPayload) => {
    loading.value = true
    try {
      const data = await $fetch(getUrl('/attendance/clock-out'), {
        method: 'POST',
        body: payload,

      })
      return data
    } catch (error: any) {
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

export const useTodayAttendance = () => {
  const getUrl = useTenantUrl()

  
  const { data, pending, error, refresh } = useFetch<Attendance>(() => getUrl('/attendance/today'), {
    key: 'attendance-today',

  })
  
  return {
    data,
    loading: pending,
    error,
    refresh
  }
}

export const useAttendanceStats = (
  startDate: MaybeRef<string>, 
  endDate: MaybeRef<string>, 
  employeeId: MaybeRef<string> = ''
) => {
  const getUrl = useTenantUrl()


  const { data, pending, error, refresh } = useFetch<AttendanceStats>(() => getUrl('/attendance/stats'), {
    key: 'attendance-stats',
    query: {
        startDate,
        endDate,
        employeeId
    },
    immediate: !!(unref(startDate) && unref(endDate)),

  })
  
  return {
    data,
    loading: pending,
    error,
    refresh
  }
}

export const useAttendanceHistory = (
    page: MaybeRef<number>,
    limit: MaybeRef<number>,
    filters: {
        startDate?: MaybeRef<string>,
        endDate?: MaybeRef<string>,
        employeeId?: MaybeRef<string>,
        status?: MaybeRef<string>
    } = {}
) => {
    const getUrl = useTenantUrl()


    const queryParams = computed(() => {
        const params: Record<string, any> = {
            page: unref(page),
            limit: unref(limit)
        }

        const start = unref(filters.startDate)
        if (start) {
             // Append T00:00:00Z if it's just YYYY-MM-DD
             params.startDate = start.includes('T') ? start : new Date(start).toISOString()
        }

        const end = unref(filters.endDate)
        if (end) {
             // Append T23:59:59Z if needed or just ISO
             params.endDate = end.includes('T') ? end : new Date(end).toISOString()
        }

        const eId = unref(filters.employeeId)
        if (eId) params.employeeId = eId

        const s = unref(filters.status)
        if (s) params.status = s

        return params
    })

    const { data, pending, refresh, error } = useFetch<AttendanceHistory>(() => getUrl('/attendance/history'), {
        key: 'attendance-history',
        query: queryParams,

    })

    return {
        data,
        loading: pending,
        refresh,
        error
    }
}

export const useTodayAttendanceDashboard = () => {
    const getUrl = useTenantUrl()

    
    const { data, pending, error, refresh } = useFetch<TodayAttendanceDashboard>(() => getUrl('/attendance/dashboard/today'), {
        key: 'attendance-dashboard-today',

    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}

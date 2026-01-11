import { u as useRoute } from './server.mjs';
import { ref, unref, computed } from 'vue';
import { u as useFetch } from './fetch-VuP8VKdC.mjs';

const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useClockIn = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      const data = await $fetch(getUrl("/attendance/clock-in"), {
        method: "POST",
        body: payload
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  return {
    mutate,
    loading
  };
};
const useClockOut = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      const data = await $fetch(getUrl("/attendance/clock-out"), {
        method: "POST",
        body: payload
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  return {
    mutate,
    loading
  };
};
const useTodayAttendance = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/attendance/today"), {
    key: "attendance-today",
    server: false
  }, "$_XterQpiXI");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useAttendanceStats = (startDate, endDate, employeeId = "") => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/attendance/stats"), {
    key: "attendance-stats",
    query: {
      startDate,
      endDate,
      employeeId
    },
    immediate: !!(unref(startDate) && unref(endDate)),
    server: false
  }, "$lTvfvdEqI0");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useAttendanceHistory = (page, limit, filters = {}) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const params = {
      page: unref(page),
      limit: unref(limit)
    };
    const start = unref(filters.startDate);
    if (start) {
      params.startDate = start.includes("T") ? start : new Date(start).toISOString();
    }
    const end = unref(filters.endDate);
    if (end) {
      params.endDate = end.includes("T") ? end : new Date(end).toISOString();
    }
    const eId = unref(filters.employeeId);
    if (eId) params.employeeId = eId;
    const s = unref(filters.status);
    if (s) params.status = s;
    return params;
  });
  const { data, pending, refresh, error } = useFetch(() => getUrl("/attendance/history"), {
    key: "attendance-history",
    query: queryParams,
    server: false
  }, "$p1AWDmVsuo");
  return {
    data,
    loading: pending,
    refresh,
    error
  };
};
const useTodayAttendanceDashboard = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/attendance/dashboard/today"), {
    key: "attendance-dashboard-today",
    server: false
  }, "$caOyNzAmY3");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};

export { useClockIn as a, useClockOut as b, useAttendanceStats as c, useTodayAttendanceDashboard as d, useAttendanceHistory as e, useTodayAttendance as u };
//# sourceMappingURL=useAttendance-DJVfF5IK.mjs.map

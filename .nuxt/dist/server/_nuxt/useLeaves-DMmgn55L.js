import { u as useRoute } from "../server.mjs";
import { computed, unref, ref } from "vue";
import { u as useFetch } from "./fetch-VuP8VKdC.js";
const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useLeavePeriods = (page = 1, limit = 10, activeOnly = false) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => ({
    page: unref(page),
    limit: unref(limit),
    activeOnly: unref(activeOnly)
  }));
  const { data, pending, error, refresh } = useFetch(() => getUrl("/leave-periods"), {
    key: "leave-periods",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$qtX8ghWCOe");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useLeavePeriod = (id) => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/leave-periods/${unref(id)}`), {
    key: `leave-period-${unref(id)}`,
    immediate: !!unref(id),
    server: false
  }, "$0bbirx3eXH");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useActiveLeavePeriod = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/leave-periods/active"), {
    key: "leave-period-active",
    server: false
  }, "$72B2smh3-S");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateLeavePeriod = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/leave-periods"), {
        method: "POST",
        body: payload
      });
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
const useUpdateLeavePeriod = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/leave-periods/${id}`), {
        method: "PATCH",
        body: payload
      });
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
const useDeleteLeavePeriod = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/leave-periods/${id}`), {
        method: "DELETE"
      });
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
const useLeaveTypes = (leavePeriodId) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const pid = unref(leavePeriodId);
    return pid ? { leavePeriodId: pid } : {};
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/leave-types"), {
    key: `leave-types-${unref(leavePeriodId)}`,
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$hoQ4AC7elX");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateLeaveType = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/leave-types"), {
        method: "POST",
        body: payload
      });
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
const useDeleteLeaveType = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/leave-types/${id}`), {
        method: "DELETE"
      });
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
const useMyLeaveRequests = (filters) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    const params = {};
    if (f.page) params.page = f.page;
    if (f.limit) params.limit = f.limit;
    if (f.startDate) params.startDate = f.startDate;
    if (f.endDate) params.endDate = f.endDate;
    if (f.status && f.status.length > 0) {
      params.status = f.status;
    }
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/leave-requests/my"), {
    key: "my-leave-requests",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$CWE2a9LCmF");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateLeaveRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/leave-requests"), {
        method: "POST",
        body: payload
      });
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
const useCancelLeaveRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/leave-requests/${id}/cancel`), {
        method: "PATCH"
      });
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
const usePendingApprovals = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/leave-requests/pending/for-approval"), {
    key: "pending-approvals",
    server: false
  }, "$3lDK_wyNxe");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useApproveLeaveRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, comments) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/leave-requests/${id}/approve`), {
        method: "PATCH",
        body: { comments }
      });
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
const useRejectLeaveRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, comments) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/leave-requests/${id}/reject`), {
        method: "PATCH",
        body: { comments }
      });
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
const useMyLeaveBalances = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/leave-balances/my"), {
    key: "my-leave-balances",
    server: false
  }, "$PZNcDWnNhK");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useEmployeeLeaveBalances = (employeeId) => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/leave-balances/employee/${unref(employeeId)}`), {
    key: `employee-leave-balances-${unref(employeeId)}`,
    immediate: !!unref(employeeId),
    server: false
  }, "$kStjcc0sHa");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
export {
  useLeaveTypes as a,
  useCreateLeaveRequest as b,
  useMyLeaveBalances as c,
  useMyLeaveRequests as d,
  useCancelLeaveRequest as e,
  useEmployeeLeaveBalances as f,
  useLeavePeriods as g,
  useDeleteLeavePeriod as h,
  usePendingApprovals as i,
  useApproveLeaveRequest as j,
  useRejectLeaveRequest as k,
  useCreateLeaveType as l,
  useLeavePeriod as m,
  useUpdateLeavePeriod as n,
  useDeleteLeaveType as o,
  useCreateLeavePeriod as p,
  useActiveLeavePeriod as u
};
//# sourceMappingURL=useLeaves-DMmgn55L.js.map

import { u as useRoute } from './server.mjs';
import { computed, unref, ref } from 'vue';
import { u as useFetch } from './fetch-VuP8VKdC.mjs';

const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useOvertimeApprovals = (filters) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    const params = {};
    if (f.skip !== void 0) params.skip = f.skip;
    if (f.take !== void 0) params.take = f.take;
    if (f.status) params.status = f.status;
    if (f.startDate) params.startDate = f.startDate;
    if (f.endDate) params.endDate = f.endDate;
    if (f.approverId) params.approverId = f.approverId;
    if (f.approverType) params.approverType = f.approverType;
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/overtime-approvals"), {
    key: "overtime-approvals",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$GTyziLkTXt");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const usePendingOvertimeApprovals = (approverType) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const type = unref(approverType);
    return type ? { approverType: type } : {};
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/overtime-approvals/pending"), {
    key: `overtime-approvals-pending-${unref(approverType)}`,
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$KcdQOdLaDK");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useOvertimeApprovalStats = (filters) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters) || {};
    const params = {};
    if (f.approverId) params.approverId = f.approverId;
    if (f.startDate) params.startDate = f.startDate;
    if (f.endDate) params.endDate = f.endDate;
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/overtime-approvals/stats"), {
    key: "overtime-approvals-stats",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$StBI2dFW9M");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useProcessOvertimeApproval = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/overtime-approvals/process"), {
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
const useEmployeeOvertimeHistory = (employeeId, filters = {}) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    const params = {};
    if (f.skip !== void 0) params.skip = f.skip;
    if (f.take !== void 0) params.take = f.take;
    if (f.status) params.status = f.status;
    if (f.startDate) params.startDate = f.startDate;
    if (f.endDate) params.endDate = f.endDate;
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/overtime-requests/employee/${unref(employeeId)}/history`), {
    key: `employee-overtime-history-${unref(employeeId)}`,
    query: queryParams,
    watch: [queryParams],
    immediate: !!unref(employeeId),
    server: false
  }, "$MY3STm2JaD");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useEmployeeTotalHours = (employeeId, filters) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    const params = {
      startDate: f.startDate,
      endDate: f.endDate
    };
    if (f.status) params.status = f.status;
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/overtime-requests/employee/${unref(employeeId)}/total-hours`), {
    key: `employee-total-hours-${unref(employeeId)}`,
    query: queryParams,
    watch: [queryParams],
    immediate: !!(unref(employeeId) && unref(filters).startDate && unref(filters).endDate),
    server: false
  }, "$heH8dD77V0");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};

export { useEmployeeTotalHours as a, usePendingOvertimeApprovals as b, useProcessOvertimeApproval as c, useOvertimeApprovals as d, useOvertimeApprovalStats as e, useEmployeeOvertimeHistory as u };
//# sourceMappingURL=useOvertime-BEYm8O2P.mjs.map

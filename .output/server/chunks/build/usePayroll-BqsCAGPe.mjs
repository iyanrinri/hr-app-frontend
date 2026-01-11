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
const usePayrolls = (filters = {}) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    return { ...f };
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/payroll"), {
    key: "payrolls",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$Vpk_xJSIi6");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useMyPayrolls = (filters = {}) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    return { ...f };
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/payroll/my"), {
    key: "my-payrolls",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$UsxDe7tf9-");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const usePayrollSummary = (employeeId) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const eid = unref(employeeId);
    return eid ? { employeeId: eid } : {};
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/payroll/summary"), {
    key: `payroll-summary-${unref(employeeId) || "all"}`,
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$f0AzCW2Mc_");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreatePayroll = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/payroll"), {
        method: "POST",
        body: payload
      });
      if (options == null ? void 0 : options.onSuccess) options.onSuccess();
    } catch (error) {
      if (options == null ? void 0 : options.onError) options.onError(error);
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
const useProcessPayrolls = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/payroll/process"), {
        method: "PUT",
        body: payload
      });
      if (options == null ? void 0 : options.onSuccess) options.onSuccess();
    } catch (error) {
      if (options == null ? void 0 : options.onError) options.onError(error);
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
const useMarkPayrollPaid = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/payroll/${id}/mark-paid`), {
        method: "PUT"
      });
      if (options == null ? void 0 : options.onSuccess) options.onSuccess();
    } catch (error) {
      if (options == null ? void 0 : options.onError) options.onError(error);
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
const useBulkGeneratePayroll = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);
  const mutate = async (payload, options) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(getUrl("/payroll/bulk-generate"), {
        method: "POST",
        body: payload
      });
      data.value = res;
      if (options == null ? void 0 : options.onSuccess) options.onSuccess(res);
    } catch (e) {
      error.value = e;
      if (options == null ? void 0 : options.onError) options.onError(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  return {
    mutate,
    loading,
    data,
    error
  };
};
const useDeletePayroll = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/payroll/${id}`), {
        method: "DELETE"
      });
      if (options == null ? void 0 : options.onSuccess) options.onSuccess();
    } catch (error) {
      if (options == null ? void 0 : options.onError) options.onError(error);
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

export { usePayrollSummary as a, useProcessPayrolls as b, useMarkPayrollPaid as c, useDeletePayroll as d, useBulkGeneratePayroll as e, useCreatePayroll as f, useMyPayrolls as g, usePayrolls as u };
//# sourceMappingURL=usePayroll-BqsCAGPe.mjs.map

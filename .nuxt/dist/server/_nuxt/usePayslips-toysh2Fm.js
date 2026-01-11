import { u as useRoute } from "../server.mjs";
import { ref, computed, unref } from "vue";
import { u as useFetch } from "./fetch-VuP8VKdC.js";
const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const usePayslips = (filters = {}) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    return { ...f };
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/payslip"), {
    key: "payslips",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$VIdifPUL60");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const usePayslip = (id) => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/payslip/${unref(id)}`), {
    key: `payslip-${unref(id)}`,
    immediate: !!unref(id),
    server: false
  }, "$PYsJ4lYK48");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useMyPayslips = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/payslip/my/history"), {
    key: "my-payslips",
    server: false
  }, "$ll_gRSh9p3");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useGeneratePayslip = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload, options) => {
    loading.value = true;
    try {
      const res = await $fetch(getUrl("/payslip/generate"), {
        method: "POST",
        body: payload
      });
      if (options?.onSuccess) options.onSuccess(res);
    } catch (error) {
      if (options?.onError) options.onError(error);
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
const useDeletePayslip = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/payslip/${id}`), {
        method: "DELETE"
      });
      if (options?.onSuccess) options.onSuccess();
    } catch (error) {
      if (options?.onError) options.onError(error);
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
export {
  usePayslips as a,
  useMyPayslips as b,
  usePayslip as c,
  useDeletePayslip as d,
  useGeneratePayslip as u
};
//# sourceMappingURL=usePayslips-toysh2Fm.js.map

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
const useOvertimeRequests = (filters = {}) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const f = unref(filters);
    const params = {};
    if (f.skip !== void 0) params.skip = f.skip;
    if (f.take !== void 0) params.take = f.take;
    if (f.status) params.status = f.status;
    if (f.startDate) params.startDate = f.startDate;
    if (f.endDate) params.endDate = f.endDate;
    if (f.employeeId) params.employeeId = f.employeeId;
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/overtime-requests"), {
    key: "overtime-requests",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$LOy9KKwPJH");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateOvertimeRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/overtime-requests"), {
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
const useUpdateOvertimeRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, payload, options) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/overtime-requests/${id}`), {
        method: "PATCH",
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
const useDeleteOvertimeRequest = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/overtime-requests/${id}`), {
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

export { useDeleteOvertimeRequest as a, useCreateOvertimeRequest as b, useUpdateOvertimeRequest as c, useOvertimeRequests as u };
//# sourceMappingURL=useOvertimeCRUD-DlVHnEXn.mjs.map

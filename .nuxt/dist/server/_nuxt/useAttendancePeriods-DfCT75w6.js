import { K as useAuthStore, u as useRoute } from "../server.mjs";
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
const useAttendancePeriods = (page = 1, limit = 10, search = "", isActive = "") => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const queryParams = computed(() => {
    const params = {
      page: unref(page),
      limit: unref(limit)
    };
    if (unref(search)) params.search = unref(search);
    if (unref(isActive)) params.isActive = unref(isActive);
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/attendance-periods"), {
    key: "attendance-periods",
    query: queryParams,
    watch: [queryParams],
    headers: computed(() => ({
      Authorization: `Bearer ${authStore.token}`
    }))
  }, "$01mWa_7XPv");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useAttendancePeriod = (id) => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/attendance-periods/${unref(id)}`), {
    key: `attendance-period-${unref(id)}`,
    immediate: !!unref(id),
    headers: computed(() => ({
      Authorization: `Bearer ${authStore.token}`
    }))
  }, "$4arJ1xWbRq");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateAttendancePeriod = () => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const loading = ref(false);
  const mutate = async (data) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/attendance-periods"), {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
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
const useUpdateAttendancePeriod = () => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const loading = ref(false);
  const mutate = async (id, data) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/attendance-periods/${id}`), {
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
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
const useDeleteAttendancePeriod = () => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/attendance-periods/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
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
export {
  useUpdateAttendancePeriod as a,
  useAttendancePeriods as b,
  useDeleteAttendancePeriod as c,
  useCreateAttendancePeriod as d,
  useAttendancePeriod as u
};
//# sourceMappingURL=useAttendancePeriods-DfCT75w6.js.map

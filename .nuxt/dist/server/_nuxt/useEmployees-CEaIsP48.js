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
const useEmployees = (page = 1, limit = 10, search = "", status = "") => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const params = {
      paginated: 1,
      page: unref(page),
      limit: unref(limit)
    };
    if (unref(search)) params.search = unref(search);
    if (unref(status)) params.status = unref(status);
    return params;
  });
  const { data, pending, error, refresh } = useFetch(() => getUrl("/employees"), {
    key: "employees",
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$o1rN1a6HDp");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useAllEmployees = () => {
  const getUrl = useTenantUrl();
  const queryParams = { paginated: 0 };
  const { data, pending, error, refresh } = useFetch(() => getUrl("/employees"), {
    key: "all-employees",
    query: queryParams,
    server: false
  }, "$AnaorHuxJL");
  const employees = computed(() => {
    if (!data.value) return [];
    if (Array.isArray(data.value)) return data.value;
    return data.value.data || [];
  });
  return {
    data: employees,
    loading: pending,
    error,
    refresh
  };
};
const useEmployee = (id) => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/employees/${unref(id)}`), {
    key: `employee-${unref(id)}`,
    immediate: !!unref(id),
    server: false
  }, "$XgLj6fgtIS");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateEmployee = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/employees"), {
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
const useUpdateEmployee = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/employees/${id}`), {
        method: "PUT",
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
const useDeleteEmployee = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/employees/${id}`), {
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
const useRestoreEmployee = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/employees/${id}/restore`), {
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
const useAssignManager = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, data) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/employees/${id}/manager`), {
        method: "PUT",
        body: data
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
const useAssignSubordinates = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, data) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/employees/${id}/subordinates`), {
        method: "POST",
        body: data
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
  useEmployees as a,
  useDeleteEmployee as b,
  useRestoreEmployee as c,
  useEmployee as d,
  useAssignManager as e,
  useAssignSubordinates as f,
  useUpdateEmployee as g,
  useCreateEmployee as h,
  useAllEmployees as u
};
//# sourceMappingURL=useEmployees-CEaIsP48.js.map

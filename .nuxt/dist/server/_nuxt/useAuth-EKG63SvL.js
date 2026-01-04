import { u as useAuthStore } from "./auth-BV7LzjtB.js";
import { D as useRouter, u as useRoute, m as useNuxtApp, G as navigateTo } from "../server.mjs";
import { ref } from "vue";
const useAuth = () => {
  useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const login = async (payload) => {
    const tenantSlug = route.params.tenant_slug;
    loading.value = true;
    try {
      const url = tenantSlug ? `/api/${tenantSlug}/auth/login` : "/api/auth/login";
      const response = await $fetch(url, {
        method: "POST",
        body: payload
        // Nuxt proxy will handle /api -> backend
      });
      const { access_token, user } = response;
      authStore.setAuth(access_token, user);
      const redirectPath = tenantSlug ? `/${tenantSlug}/dashboard` : "/dashboard";
      navigateTo(redirectPath);
    } catch (error) {
      const message = error.data?.message || "Login failed";
      throw new Error(message);
    } finally {
      loading.value = false;
    }
  };
  const logout = () => {
    const tenantSlug = route.params.tenant_slug;
    authStore.clearAuth();
    const redirectPath = tenantSlug ? `/${tenantSlug}/auth/login` : "/auth/login";
    return navigateTo(redirectPath);
  };
  return {
    login,
    logout,
    loading
  };
};
export {
  useAuth as u
};
//# sourceMappingURL=useAuth-EKG63SvL.js.map

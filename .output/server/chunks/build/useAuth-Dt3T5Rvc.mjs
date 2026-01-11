import { n as useRouter, u as useRoute, K as useAuthStore, ag as useNuxtApp, aj as navigateTo } from './server.mjs';
import { ref } from 'vue';

const useAuth = () => {
  useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const login = async (payload) => {
    var _a;
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
      const message = ((_a = error.data) == null ? void 0 : _a.message) || "Login failed";
      throw new Error(message);
    } finally {
      loading.value = false;
    }
  };
  const logout = async () => {
    const tenantSlug = route.params.tenant_slug;
    try {
      const url = tenantSlug ? `/api/${tenantSlug}/auth/logout` : "/api/auth/logout";
      await $fetch(url, {
        method: "POST"
      });
    } catch (error) {
      console.error("Logout API call failed", error);
    } finally {
      authStore.clearAuth();
      const redirectPath = tenantSlug ? `/${tenantSlug}/auth/login` : "/auth/login";
      return navigateTo(redirectPath);
    }
  };
  return {
    login,
    logout,
    loading
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-Dt3T5Rvc.mjs.map

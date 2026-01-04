import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  // Intercept global $fetch
  const originalFetch = globalThis.$fetch;
  
  // @ts-ignore
  globalThis.$fetch = async (request, options = {}) => {
    // Only intercept requests to our API proxy
    if (typeof request === 'string' && request.startsWith('/api')) {
      // Add Authorization header if token exists
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`
        };
      }
    }
    
    try {
      return await originalFetch(request, options);
    } catch (error: any) {
        // Handle 401s if needed globally, but be careful of infinite loops
        if (error.response?.status === 401) {
            // Optional: Redirect to login or clear auth
            // But usually we let the page handle it or auth middleware
        }
        throw error;
    }
  };
});

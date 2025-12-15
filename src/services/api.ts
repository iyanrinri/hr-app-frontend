import axios from "axios";
import { getAuthToken, clearAuth } from "@/store/authStore";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  let token = getAuthToken();
  
  // Fallback to cookie if token is not in state (e.g. before hydration or after hard refresh)
  if (!token && typeof document !== 'undefined') {
    // Try to find auth-token in cookies using regex (more robust than split)
    const match = document.cookie.match(new RegExp('(^| )auth-token=([^;]+)'));
    if (match) {
      token = match[2];
      // console.log('Auth token recovered from cookie');
    }
  }

  // Fallback to localStorage if token is still missing (e.g. zustand not hydrated yet but storage exists)
  if (!token && typeof window !== 'undefined') {
    try {
      const storage = localStorage.getItem('hr-auth');
      if (storage) {
        const parsed = JSON.parse(storage);
        if (parsed.state && parsed.state.token) {
          token = parsed.state.token;
          // console.log('Auth token recovered from localStorage');
        }
      }
    } catch {
      // console.error('Failed to parse auth storage', e);
    }
  }

  // Debugging (remove in prod)
  // if (!token) console.warn('No auth token found for request', config.url);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Inject tenant_slug from URL if available
  if (typeof window !== 'undefined') {
    const pathParts = window.location.pathname.split('/');
    // Assumes URL structure: /:tenant_slug/...
    // pathParts[0] is empty string, pathParts[1] is tenant_slug
    const tenantSlug = pathParts[1];
    
    // Check if we have a valid slug (not an empty string and not a system route like 'api' if avoided)
    if (tenantSlug && tenantSlug !== 'auth' && tenantSlug !== 'dashboard' && tenantSlug !== 'api') {
      // If baseURL is '/api', we want to append slug after it, or insert it. 
      // User requirement: {tenant_slug}/{api_path}
      // If config.url is '/payroll', and we want '/api/{tenant_slug}/payroll', 
      // we can prepend it to url if baseURL is handled or if we modify baseURL.
      // But usually easier to just prepend to the url.
      
      // Remove leading slash from url if present to avoid double slashes
      const url = config.url?.startsWith('/') ? config.url.substring(1) : config.url;
      config.url = `/${tenantSlug}/${url}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
      // Optionally redirect to login here or handle in UI
    }
    return Promise.reject(err);
  }
);

export default api;

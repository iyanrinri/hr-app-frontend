import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, registerTenant, logout as logoutApi } from '@/services/auth';
import { setAuth, clearAuth } from '@/store/authStore';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import { TenantRegisterPayload } from '@/types/auth';

export const useLogin = () => {
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { access_token, user } = response.data;
      setAuth(access_token, user);
      // Set cookie for middleware
      document.cookie = `auth-token=${access_token}; path=/; max-age=86400; SameSite=Strict`;
      toast.success('Logged in successfully');
      router.push(tenantSlug ? `/${tenantSlug}/dashboard` : '/dashboard');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegisterTenant = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (payload: TenantRegisterPayload) => registerTenant(payload),
    onSuccess: (response) => {
      const { user } = response.data;
      toast.success(`Workspace registered successfully! Welcome, ${user.firstName}!`);
      // Redirect to the new tenant's login page
      router.push(`/${user.tenantSlug}/auth/login`);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message || 'Registration failed');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;

  return async () => {
    try {
      // Call backend logout API
      await logoutApi();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Always clear local state
      clearAuth();
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      queryClient.clear();
      router.push(tenantSlug ? `/${tenantSlug}/auth/login` : '/auth/login');
      toast.success('Logged out');
    }
  };
};

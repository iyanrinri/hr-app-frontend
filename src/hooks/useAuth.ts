import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/services/auth';
import { setAuth, clearAuth } from '@/store/authStore';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

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

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;

  return () => {
    clearAuth();
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    queryClient.clear();
    router.push(tenantSlug ? `/${tenantSlug}/auth/login` : '/auth/login');
    toast.success('Logged out');
  };
};

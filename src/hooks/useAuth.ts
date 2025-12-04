import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/services/auth';
import { setAuth, clearAuth } from '@/store/authStore';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { accessToken, user } = response.data;
      setAuth(accessToken, user);
      // Set cookie for middleware
      document.cookie = `auth-token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
      toast.success('Logged in successfully');
      router.push('/dashboard');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    clearAuth();
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    queryClient.clear();
    router.push('/auth/login');
    toast.success('Logged out');
  };
};

import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types/auth';

export const useProfile = () => {
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetchProfile();
      const userData = response.data as User;
      
      // Update auth store with fresh user data including hasSubordinates
      if (token) {
        setAuth(token, userData);
      }
      
      return userData;
    },
    enabled: !!token, // Only fetch if user is logged in
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

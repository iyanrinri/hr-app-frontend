import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export interface UserRole {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data } = await api.get<UserRole[]>('/roles/users');
      return data;
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  joinDate: string;
  baseSalary: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface EmployeesResponse {
  data: Employee[];
  meta: Meta;
}

export const useEmployees = (page = 1, limit = 10, search = '', status = '') => {
  return useQuery({
    queryKey: ['employees', page, limit, search, status],
    queryFn: async () => {
      // Add 2 second delay for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const params: Record<string, string | number> = { 
        paginated: 1, 
        page, 
        limit 
      };
      
      if (search) params.search = search;
      if (status) params.status = status;

      const { data } = await api.get<EmployeesResponse>('/employees', { params });
      return data;
    },
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: async () => {
      // Add 1 second delay for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data } = await api.get<Employee>(`/employees/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  department: string;
  joinDate: string;
  baseSalary: number;
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateEmployeePayload) => api.post('/employees', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee created successfully');
      router.push('/dashboard/employees');
    },
    onError: () => {
      toast.error('Failed to create employee');
    },
  });
};

export const useUpdateEmployee = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: Partial<Employee>) => api.patch(`/employees/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employees', id] });
      toast.success('Employee updated successfully');
      router.push('/dashboard/employees');
    },
    onError: () => {
      toast.error('Failed to update employee');
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/employees/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete employee');
    },
  });
};

export const useRestoreEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.patch(`/employees/${id}/restore`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee restored successfully');
    },
    onError: () => {
      toast.error('Failed to restore employee');
    },
  });
};

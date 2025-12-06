import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

export interface Holiday {
  id: string;
  attendancePeriodId: string;
  name: string;
  date: string;
  isNational: boolean;
  isRecurring: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useHolidays = (attendancePeriodId: string) => {
  return useQuery({
    queryKey: ['holidays', attendancePeriodId],
    queryFn: async () => {
      const { data } = await api.get<Holiday[]>('/attendance-periods/holidays/list', {
        params: { attendancePeriodId }
      });
      return data;
    },
    enabled: !!attendancePeriodId,
  });
};

export const useCreateHoliday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => 
      api.post('/attendance-periods/holidays', data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['holidays', variables.attendancePeriodId] });
      queryClient.invalidateQueries({ queryKey: ['attendance-periods'] });
      toast.success('Holiday created successfully');
    },
    onError: () => {
      toast.error('Failed to create holiday');
    },
  });
};

export const useUpdateHoliday = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Holiday>) => 
      api.patch(`/attendance-periods/holidays/${id}`, data),
    onSuccess: (_, variables) => {
      if (variables.attendancePeriodId) {
        queryClient.invalidateQueries({ queryKey: ['holidays', variables.attendancePeriodId] });
      }
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-periods'] });
      toast.success('Holiday updated successfully');
    },
    onError: () => {
      toast.error('Failed to update holiday');
    },
  });
};

export const useDeleteHoliday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/attendance-periods/holidays/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-periods'] });
      toast.success('Holiday deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete holiday');
    },
  });
};

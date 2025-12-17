import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

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

export interface AttendancePeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  workingDaysPerWeek: number;
  workingHoursPerDay: number;
  workingStartTime: string;
  workingEndTime: string;
  allowSaturdayWork: boolean;
  allowSundayWork: boolean;
  lateToleranceMinutes: number;
  earlyLeaveToleranceMinutes: number;
  isActive: boolean;
  description: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  holidays?: Holiday[];
  _count?: {
    attendances: number;
    attendanceLogs: number;
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

export interface AttendancePeriodsResponse {
  data: AttendancePeriod[];
  meta: Meta;
}

export const useAttendancePeriods = (page = 1, limit = 10, search = '', isActive = '') => {
  return useQuery({
    queryKey: ['attendance-periods', page, limit, search, isActive],
    queryFn: async () => {
      // Add 1 second delay for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const params: Record<string, string | number> = { 
        page, 
        limit 
      };
      
      if (search) params.search = search;
      if (isActive) params.isActive = isActive;

      const { data } = await api.get<AttendancePeriodsResponse>('/attendance-periods', { params });
      return data;
    },
  });
};

export const useAttendancePeriod = (id: string) => {
  return useQuery({
    queryKey: ['attendance-periods', id],
    queryFn: async () => {
      // Add 1 second delay for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data } = await api.get<AttendancePeriod>(`/attendance-periods/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useActivePeriod = () => {
  return useQuery({
    queryKey: ['attendance-periods', 'active'],
    queryFn: async () => {
      const { data } = await api.get<AttendancePeriod>('/attendance-periods/active');
      return data;
    },
  });
};

export const useCreateAttendancePeriod = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;

  return useMutation({
    mutationFn: (data: Omit<AttendancePeriod, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => 
      api.post('/attendance-periods', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance-periods'] });
      toast.success('Attendance period created successfully');
      router.push(tenantSlug ? `/${tenantSlug}/dashboard/attendance-periods` : '/dashboard/attendance-periods');
    },
    onError: () => {
      toast.error('Failed to create attendance period');
    },
  });
};

export const useUpdateAttendancePeriod = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;

  return useMutation({
    mutationFn: (data: Partial<AttendancePeriod>) => 
      api.patch(`/attendance-periods/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance-periods'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-periods', id] });
      toast.success('Attendance period updated successfully');
      router.push(tenantSlug ? `/${tenantSlug}/dashboard/attendance-periods` : '/dashboard/attendance-periods');
    },
    onError: () => {
      toast.error('Failed to update attendance period');
    },
  });
};

export const useDeleteAttendancePeriod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/attendance-periods/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance-periods'] });
      toast.success('Attendance period deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete attendance period');
    },
  });
};

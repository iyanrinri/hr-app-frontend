import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import {
  OvertimeRequest,
  OvertimeListResponse,
  CreateOvertimePayload,
  UpdateOvertimePayload,
  OvertimeFilters,
  EmployeeOvertimeHistoryFilters,
  TotalHoursFilters,
  TotalHoursResponse
} from '@/types/overtime';

// --- Overtime Requests ---

export const useOvertimeRequests = (filters?: OvertimeFilters) => {
  return useQuery({
    queryKey: ['overtime-requests', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.skip !== undefined) params.append('skip', filters.skip.toString());
      if (filters?.take !== undefined) params.append('take', filters.take.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.employeeId) params.append('employeeId', filters.employeeId);

      const { data } = await api.get<OvertimeListResponse>('/overtime-requests', { params });
      return data;
    },
  });
};

export const usePendingOvertimeRequests = () => {
  return useQuery({
    queryKey: ['overtime-requests', 'pending'],
    queryFn: async () => {
      const { data } = await api.get<OvertimeRequest[]>('/overtime-requests/pending');
      return data;
    },
  });
};

export const useOvertimeRequestDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['overtime-request', id],
    queryFn: async () => {
      const { data } = await api.get<OvertimeRequest>(`/overtime-requests/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateOvertimeRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOvertimePayload) => api.post('/overtime-requests', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-requests'] });
      toast.success('Overtime request submitted successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit overtime request');
    }
  });
};

export const useUpdateOvertimeRequest = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateOvertimePayload) => api.patch(`/overtime-requests/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-requests'] });
      queryClient.invalidateQueries({ queryKey: ['overtime-request', id] });
      toast.success('Overtime request updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update overtime request');
    }
  });
};

export const useDeleteOvertimeRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.delete(`/overtime-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-requests'] });
      toast.success('Overtime request deleted successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete overtime request');
    }
  });
};

// --- Approvals ---

export const useApproveOvertimeRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comments }: { id: string | number; comments?: string }) => 
      api.patch(`/overtime-requests/${id}/approve`, { managerComments: comments }), // Assuming payload structure
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-requests'] });
      toast.success('Overtime request approved');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to approve request');
    }
  });
};

export const useRejectOvertimeRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comments }: { id: string | number; comments?: string }) => 
      api.patch(`/overtime-requests/${id}/reject`, { rejectionReason: comments }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-requests'] });
      toast.success('Overtime request rejected');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to reject request');
    }
  });
};

// --- Admin Features ---

export const useEmployeeOvertimeHistory = (
  employeeId: string | number,
  filters?: EmployeeOvertimeHistoryFilters
) => {
  return useQuery({
    queryKey: ['employee-overtime-history', employeeId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.skip !== undefined) params.append('skip', filters.skip.toString());
      if (filters?.take !== undefined) params.append('take', filters.take.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const { data } = await api.get<OvertimeListResponse>(
        `/overtime-requests/employee/${employeeId}/history`,
        { params }
      );
      return data;
    },
    enabled: !!employeeId,
  });
};

export const useEmployeeTotalHours = (
  employeeId: string | number,
  filters: TotalHoursFilters
) => {
  return useQuery({
    queryKey: ['employee-total-hours', employeeId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('startDate', filters.startDate);
      params.append('endDate', filters.endDate);
      if (filters.status) params.append('status', filters.status);

      const { data } = await api.get<TotalHoursResponse>(
        `/overtime-requests/employee/${employeeId}/total-hours`,
        { params }
      );
      return data;
    },
    enabled: !!employeeId && !!filters.startDate && !!filters.endDate,
  });
};

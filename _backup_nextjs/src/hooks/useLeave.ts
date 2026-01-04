import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import { 
  LeavePeriod, 
  LeavePeriodsResponse, 
  CreateLeavePeriodPayload, 
  UpdateLeavePeriodPayload,
  LeaveType,
  CreateLeaveTypePayload,
  UpdateLeaveTypePayload 
} from '@/types/leave';

// --- Leave Periods ---

export const useLeavePeriods = (page = 1, limit = 10, activeOnly = false) => {
  return useQuery({
    queryKey: ['leave-periods', page, limit, activeOnly],
    queryFn: async () => {
      const { data } = await api.get<LeavePeriodsResponse>('/leave-periods', {
        params: { page, limit, activeOnly }
      });
      return data;
    },
  });
};

export const useLeavePeriod = (id: string | number) => {
  return useQuery({
    queryKey: ['leave-periods', id],
    queryFn: async () => {
      const { data } = await api.get<LeavePeriod>(`/leave-periods/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useActiveLeavePeriod = () => {
  return useQuery({
    queryKey: ['leave-periods', 'active'],
    queryFn: async () => {
      const { data } = await api.get<LeavePeriod>('/leave-periods/active');
      return data;
    },
  });
};

export const useCreateLeavePeriod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeavePeriodPayload) => api.post('/leave-periods', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-periods'] });
      toast.success('Leave period created successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create leave period');
    }
  });
};

export const useUpdateLeavePeriod = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateLeavePeriodPayload) => api.patch(`/leave-periods/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-periods'] });
      queryClient.invalidateQueries({ queryKey: ['leave-periods', id] });
      toast.success('Leave period updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update leave period');
    }
  });
};

export const useDeleteLeavePeriod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.delete(`/leave-periods/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-periods'] });
      toast.success('Leave period deleted successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete leave period');
    }
  });
};

// --- Leave Types ---

// Usually we fetch Leave Types either globally or per period. 
// Assuming GET /leave-types lists all or filters. 
// If the backend allows filtering by leavePeriodId, we should add that param.
export const useLeaveTypes = (leavePeriodId?: number) => {
  return useQuery({
    queryKey: ['leave-types', leavePeriodId],
    queryFn: async () => {
      const params = leavePeriodId ? { leavePeriodId } : {};
      const { data } = await api.get<LeaveType[]>('/leave-types', { params });
      return data;
    },
  });
};

export const useCreateLeaveType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeaveTypePayload) => api.post('/leave-types', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-types'] });
      // Also invalidate period as it might be nested
      queryClient.invalidateQueries({ queryKey: ['leave-periods'] }); 
      toast.success('Leave type created successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create leave type');
    }
  });
};

export const useUpdateLeaveType = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateLeaveTypePayload) => api.patch(`/leave-types/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-types'] });
      queryClient.invalidateQueries({ queryKey: ['leave-periods'] });
      toast.success('Leave type updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update leave type');
    }
  });
};

export const useDeleteLeaveType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/leave-types/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-types'] });
      queryClient.invalidateQueries({ queryKey: ['leave-periods'] });
      toast.success('Leave type deleted successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete leave type');
    }
  });
};

// --- Leave Requests ---

export const useMyLeaveRequests = (filters: import('@/types/leave').LeaveRequestFilters) => {
  return useQuery({
    queryKey: ['my-leave-requests', filters],
    queryFn: async () => {
      // Build query params
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.status && filters.status.length > 0) {
        filters.status.forEach(s => params.append('status', s)); // Or comma separated depending on backend
      }
      
      const { data } = await api.get('/leave-requests/my', { params });
      return data;
    },
  });
};

export const useLeaveRequest = (id: number | string) => {
  return useQuery({
    queryKey: ['leave-request', id],
    queryFn: async () => {
      const { data } = await api.get(`/leave-requests/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: import('@/types/leave').AssignLeavePayload) => api.post('/leave-requests', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-leave-requests'] });
      queryClient.invalidateQueries({ queryKey: ['my-leave-balances'] });
      toast.success('Leave request submitted successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit leave request');
    }
  });
};

export const useCancelLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => api.patch(`/leave-requests/${id}/cancel`), // Assuming PATCH for cancel based on user info "PATH /cancel" likely PATCH
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-leave-requests'] });
      queryClient.invalidateQueries({ queryKey: ['my-leave-balances'] });
      toast.success('Leave request cancelled');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to cancel request');
    }
  });
};

// --- Approvals ---

export const usePendingApprovals = () => {
  return useQuery({
    queryKey: ['pending-approvals'],
    queryFn: async () => {
      const { data } = await api.get('/leave-requests/pending/for-approval');
      return data;
    },
  });
};

export const useApproveLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comments }: { id: number | string; comments?: string }) => 
      api.patch(`/leave-requests/${id}/approve`, { comments }), // Assuming payload structure or lack thereof
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
      toast.success('Leave request approved');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to approve request');
    }
  });
};

export const useRejectLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comments }: { id: number | string; comments?: string }) => 
      api.patch(`/leave-requests/${id}/reject`, { comments }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
      toast.success('Leave request rejected');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to reject request');
    }
  });
};

// --- Balances ---

export const useMyLeaveBalances = () => {
  return useQuery({
    queryKey: ['my-leave-balances'],
    queryFn: async () => {
      const { data } = await api.get('/leave-balances/my'); // Or /summary if that's preferred
      return data;
    },
  });
};

export const useEmployeeLeaveBalances = (employeeId: number | string) => {
  return useQuery({
    queryKey: ['employee-leave-balances', employeeId],
    queryFn: async () => {
      const { data } = await api.get(`/leave-balances/employee/${employeeId}`);
      return data;
    },
    enabled: !!employeeId,
  });
};

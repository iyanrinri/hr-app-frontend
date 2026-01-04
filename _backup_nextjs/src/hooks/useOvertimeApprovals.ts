import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import {
  OvertimeRequest,
  OvertimeListResponse,
  OvertimeFilters,
  ApproverType,
  OvertimeApprovalProcessPayload,
  OvertimeApprovalStats
} from '@/types/overtime';

// --- Approvals List ---

export const useOvertimeApprovals = (filters?: OvertimeFilters & { approverId?: number; approverType?: ApproverType }) => {
  return useQuery({
    queryKey: ['overtime-approvals', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.skip !== undefined) params.append('skip', filters.skip.toString());
      if (filters?.take !== undefined) params.append('take', filters.take.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.approverId) params.append('approverId', filters.approverId.toString());
      if (filters?.approverType) params.append('approverType', filters.approverType);

      const { data } = await api.get<OvertimeListResponse>('/overtime-approvals', { params });
      return data;
    },
  });
};

// --- Pending Approvals ---

export const usePendingOvertimeApprovals = (approverType?: ApproverType) => {
  return useQuery({
    queryKey: ['overtime-approvals', 'pending', approverType],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (approverType) params.append('approverType', approverType);
      
      const { data } = await api.get<OvertimeRequest[]>('/overtime-approvals/pending', { params });
      return data;
    },
  });
};

// --- Approval Statistics ---

export const useOvertimeApprovalStats = (filters?: { approverId?: number; startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ['overtime-approvals', 'stats', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.approverId) params.append('approverId', filters.approverId.toString());
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const { data } = await api.get<OvertimeApprovalStats>('/overtime-approvals/stats', { params });
      return data;
    },
  });
};

// --- Process Approval (Approve/Reject) ---

export const useProcessOvertimeApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: OvertimeApprovalProcessPayload) => 
      api.post('/overtime-approvals/process', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-approvals'] });
      queryClient.invalidateQueries({ queryKey: ['overtime-requests'] }); // Sync requests list too
      toast.success('Approval processed successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to process approval');
    }
  });
};

// --- Update Approval ---

export const useUpdateOvertimeApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<OvertimeApprovalProcessPayload> }) => 
      api.patch(`/overtime-approvals/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-approvals'] });
      toast.success('Approval updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update approval');
    }
  });
};

// --- Delete Approval ---

export const useDeleteOvertimeApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.delete(`/overtime-approvals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overtime-approvals'] });
      toast.success('Approval record deleted successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete approval');
    }
  });
};

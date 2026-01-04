import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import { EmployeeProfile, UpdateProfilePayload } from '@/types/employee';

// --- My Profile ---

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: async () => {
      const { data } = await api.get<EmployeeProfile>('/employees/profile/me');
      return data;
    },
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => api.patch<EmployeeProfile>('/employees/profile/me', data),
    onSuccess: (response) => {
      queryClient.setQueryData(['profile', 'me'], response.data);
      toast.success('Profile updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    }
  });
};

// --- Employee Profile (Admin/Manager Access) ---

export const useEmployeeProfile = (id: string | number) => {
  return useQuery({
    queryKey: ['employee', id, 'profile'],
    queryFn: async () => {
      const { data } = await api.get<EmployeeProfile>(`/employees/${id}/profile`);
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateEmployeeProfile = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => api.patch<EmployeeProfile>(`/employees/${id}/profile`, data),
    onSuccess: (response) => {
      queryClient.setQueryData(['employee', id, 'profile'], response.data);
      queryClient.invalidateQueries({ queryKey: ['employees'] }); // Refresh list if needed
      toast.success('Employee profile updated successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update employee profile');
    }
  });
};

// --- Profile Picture Hooks ---

export const useUploadMyProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return api.post<{ url: string }>('/employees/profile/me/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (response) => {
      // Optimistically update the profile picture URL
      queryClient.setQueryData<EmployeeProfile>(['profile', 'me'], (old) => {
        if (!old) return old;
        return { ...old, profilePicture: response.data.url, profilePictureUrl: response.data.url };
      });
      toast.success('Profile picture uploaded successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload profile picture');
    },
  });
};

export const useDeleteMyProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete('/employees/profile/me/picture'),
    onSuccess: () => {
      queryClient.setQueryData<EmployeeProfile>(['profile', 'me'], (old) => {
        if (!old) return old;
        return { ...old, profilePicture: undefined, profilePictureUrl: undefined };
      });
      toast.success('Profile picture removed successfully');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to remove profile picture');
    },
  });
};

export const useUploadEmployeePicture = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return api.post<{ url: string }>(`/employees/${id}/picture`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (response) => {
      queryClient.setQueryData<EmployeeProfile>(['employee', id, 'profile'], (old) => {
        if (!old) return old;
        return { ...old, profilePicture: response.data.url, profilePictureUrl: response.data.url };
      });
      toast.success('Employee profile picture uploaded');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload profile picture');
    },
  });
};

export const useDeleteEmployeePicture = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete(`/employees/${id}/picture`),
    onSuccess: () => {
      queryClient.setQueryData<EmployeeProfile>(['employee', id, 'profile'], (old) => {
        if (!old) return old;
        return { ...old, profilePicture: undefined, profilePictureUrl: undefined };
      });
      toast.success('Employee profile picture removed');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to remove profile picture');
    },
  });
};

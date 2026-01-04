import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';
import { SettingsResponse, UpdateSettingPayload, SettingCategory } from '@/types/settings';
import { AxiosError } from 'axios';

export const useSettings = (
  page = 1,
  limit = 20,
  category?: SettingCategory,
  isPublic?: boolean
) => {
  return useQuery({
    queryKey: ['settings', page, limit, category, isPublic],
    queryFn: async () => {
      const params: Record<string, string | number | boolean> = { page, limit };
      if (category) params.category = category;
      if (isPublic !== undefined) params.isPublic = isPublic;

      const { data } = await api.get<SettingsResponse>('/settings', { params });
      return data;
    },
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, value }: UpdateSettingPayload) =>
      api.patch(`/settings/${key}`, { value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      // Invalidate public settings too if needed
      queryClient.invalidateQueries({ queryKey: ['settings', 'public'] });
      toast.success('Setting updated successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || 'Failed to update setting';
      toast.error(message);
    },
  });
};

export const useInitializeSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post('/settings/initialize'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings initialized to defaults');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || 'Failed to initialize settings';
      toast.error(message);
    },
  });
};

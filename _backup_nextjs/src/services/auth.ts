import api from './api';
import { LoginResponse, RegisterPayload, TenantRegisterPayload, TenantRegisterResponse } from '@/types/auth';

export const login = (payload: { email: string; password: string }) =>
  api.post<LoginResponse>('/auth/login', payload);

export const register = (payload: RegisterPayload) =>
  api.post<LoginResponse>('/auth/register', payload);

export const registerTenant = (payload: TenantRegisterPayload) =>
  api.post<TenantRegisterResponse>('/tenant/register', payload);

export const logout = () =>
  api.post('/tenant/logout');

export const fetchProfile = () => api.get('/auth/profile');

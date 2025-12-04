import api from './api';
import { LoginResponse, RegisterPayload } from '@/types/auth';

export const login = (payload: { email: string; password: string }) =>
  api.post<LoginResponse>('/auth/login', payload);

export const register = (payload: RegisterPayload) =>
  api.post<LoginResponse>('/auth/register', payload);

export const fetchProfile = () => api.get('/auth/profile');

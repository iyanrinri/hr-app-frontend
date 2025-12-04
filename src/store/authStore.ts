import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth';

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  getAuthToken: () => string | null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      getAuthToken: () => get().token,
    }),
    {
      name: 'hr-auth',
    }
  )
);

export const getAuthToken = () => useAuthStore.getState().token;
export const clearAuth = () => useAuthStore.getState().clearAuth();
export const setAuth = (token: string, user: User) =>
  useAuthStore.getState().setAuth(token, user);

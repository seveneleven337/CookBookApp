'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  RegisterPayload,
  LoginPayload,
} from '../lib/auth-api';

export interface AuthUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  register: (data: RegisterPayload) => Promise<void>;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (payload: RegisterPayload) => {
        set({ isLoading: true, error: null });

        try {
          const response = await registerUserApi(payload);

          set({
            user: response.user ?? null,
            token: response.token ?? null,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Registration failed';
          set({ isLoading: false, error: message });
          throw err;
        }
      },
      login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null });

        try {
          const response = await loginUserApi(payload);
          set({
            user: response.user ?? null,
            token: response.token,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed';
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      logout: () => set({ user: null, token: null, error: null }),
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        // only persist these fields
        token: state.token,
        user: state.user,
      }),
    },
  ),
);

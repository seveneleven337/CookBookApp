'use client';
import { User } from '@/types/user-type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/*
 * This store manages the user state, allowing components to access and update the current
 * user's information throughout the application. It provides a `setUser` function to update
 * the user state when a user logs in or out.
 */
interface UserState {
  user?: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: undefined }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

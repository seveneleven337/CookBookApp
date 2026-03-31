'use client';

import { User } from '@/types/user-type';
import { create } from 'zustand';

interface UserState {
  user: User | undefined;
  setUser: (user: User) => void;
  addUser: (user: User) => void;
}

export const useInventoryStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  addUser: (user) => set(() => ({ user })),
}));

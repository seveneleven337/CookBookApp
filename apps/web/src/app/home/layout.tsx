'use client';
import React, { useEffect } from 'react';
import { useUserStore } from '@/data/store/authStore';
import { useRouter } from 'next/navigation';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user && route) {
      console.warn('No user found, redirecting to login page');
      route.push('/login');
    }
  }, [user, route]);

  if (!user) {
    return null;
  }

  return children;
}

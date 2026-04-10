'use client';
import React, { useEffect } from 'react';
import { useUserStore } from '@/data/store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user && route) {
      toast.info('Please log in to access the content.');
      route.push('/login');
    }
  }, [user, route]);

  if (!user) {
    return null;
  }

  return children;
}

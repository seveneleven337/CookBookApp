'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUserStore } from '@/data/store/authStore';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user?.token) {
      router.push('/login');
      toast.info('Please log in to access the content.');
    }
  }, [user, hasHydrated, router]);

  if (!hasHydrated) return null;

  if (!user?.token) return null;

  return <>{children}</>;
}

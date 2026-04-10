'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/data/store/authStore';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user?.token) {
      router.push('/redirect');
    }
  }, [user, hasHydrated, router]);

  if (!hasHydrated) return null;

  if (!user?.token) return null;

  return <>{children}</>;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/data/store/authStore';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user?.token) {
      router.push('/');
    }
  }, [user, hasHydrated, router]);

  if (!hasHydrated) return null;

  if (!user?.token) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

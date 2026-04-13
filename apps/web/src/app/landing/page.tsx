'use client';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import MainFrame from './MainFrame';
import RecipesFrame from './RecipesFrame';
import CategoryFrame from './CategoryFrame';
import { useUserStore } from '@/data/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.token) router.push('/home');
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {/* nav bar */}
      <NavBar />
      {/* landing content */}
      <MainFrame />
      {/* categories */}
      <CategoryFrame />
      {/* 6 random recipes */}
      <RecipesFrame />
      <Footer />
    </div>
  );
}

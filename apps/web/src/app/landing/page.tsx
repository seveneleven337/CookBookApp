'use client';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import MainFrame from '../../components/MainFrame';
import RecipesFrame from '../../components/RecipesFrame';
import CategoryFrame from './CategoryFrame';
import { useUserStore } from '@/data/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecipes } from '@/data/react-query/useRecipe';

export default function LandingPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { data: meals } = useRecipes();

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
      <RecipesFrame
        title={'Latest From The Kitchen'}
        subtitle={'*Good food is the foundation for genuine happiness'}
        meals={meals || []}
      />
      {/* footer */}
      <Footer />
    </div>
  );
}

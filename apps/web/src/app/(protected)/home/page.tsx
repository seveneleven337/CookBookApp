'use client';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

import CategoryFrame from '@/app/landing/CategoryFrame';
import RecipesFrame from '@/components/RecipesFrame';
import { useRecipes } from '@/data/react-query/useRecipe';
import MainFrame from '@/components/MainFrame';

export default function HomePage() {
  const { data: meals } = useRecipes();
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
      />{' '}
      <Footer />
    </div>
  );
}

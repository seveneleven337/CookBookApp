'use client';

import CategoryFrame from '@/app/landing/CategoryFrame';
import RecipesFrame from '@/components/RecipesFrame';
import { useRecipes } from '@/data/react-query/useRecipe';
import MainFrame from '@/components/MainFrame';
import { useRecommendedRecipes } from '@/data/react-query/useRecommendRecipe';
import { useUserStore } from '@/data/store/authStore';

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const { data: meals } = useRecipes();
  const { data: recommendedMeals } = useRecommendedRecipes(user!, '53267');
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {/* landing content */}
      <MainFrame />
      {/* categories */}
      <CategoryFrame />
      {/* 6 recommended recipes */}
      <RecipesFrame
        title={'Recommendeds For Your Kitchen'}
        subtitle={'*Handpicked recipes just for you'}
        meals={recommendedMeals || []}
        variant="default"
      />
      {/* 6 random recipes */}
      <RecipesFrame
        title={'Latest From The Kitchen'}
        subtitle={'*Good food is the foundations for genuine happiness'}
        meals={meals || []}
        variant="default"
      />
    </div>
  );
}

'use client';
import MealCard from '@/components/MealCard';
import { useRecipes } from '@/data/react-query/useRecipe';

export default function RecipesFrame() {
  const { data: meals } = useRecipes();

  return (
    <div className="flex flex-col w-full h-fit items-center justify-center  p-12 gap-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex w-full h-fit items-center justify-center flex-col">
          <div className="text-3xl text-primary font-semibold">Latest From The Kitchen</div>
          <div className="flex font-normal text-sm text-text-subtitle">
            *Good food is the foundation for genuine happiness
          </div>
        </div>

        <div className="w-full max-w-6xl flex flex-col items-center gap-y-5 py-4 overflow-x-hidden">
          <div className="flex justify-center gap-5 max-w-full">
            {meals?.slice(0, 3).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
          <div className="flex justify-center gap-5  max-w-full">
            {meals?.slice(3, 6).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

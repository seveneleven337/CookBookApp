'use client';
import MealCard from '@/components/MealCard';
import { Meal } from '@/types/recipe-service-type';

type RecipeFramProps = {
  title: string;
  subtitle?: string;
  meals: Meal[];
};

export default function RecipesFrame({ title, subtitle, meals }: RecipeFramProps) {
  if (!meals) return null;
  return (
    <div className="flex flex-col w-full h-fit items-center justify-center  p-12 gap-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex w-full h-fit items-center justify-center flex-col">
          <div className="text-3xl text-primary font-semibold">{title}</div>
          <div className="flex font-normal text-sm text-text-subtitle">{subtitle}</div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl grid gap-5 py-4 overflow-x-hidden md:grid-cols-3 justify-center items-center">
            {meals.slice(0, 6).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

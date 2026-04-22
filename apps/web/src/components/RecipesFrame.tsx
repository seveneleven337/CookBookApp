'use client';
import MealCard from '@/components/MealCard';
import { Meal } from '@/types/recipe-service-type';

type RecipeFrameProps = {
  title: string;
  subtitle?: string;
  meals: Meal[];
  variant?: 'default' | 'myRecipe';
};

export default function RecipesFrame({
  title,
  subtitle,
  meals,
  variant = 'default',
}: RecipeFrameProps) {
  if (!meals) return null;
  return (
    <div className="flex flex-col w-full h-fit items-center justify-between py-12 gap-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex w-full h-fit items-center justify-center flex-col">
          <div className="text-3xl text-primary font-semibold">{title}</div>
          <div className="flex font-normal text-sm text-text-subtitle">{subtitle}</div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full grid gap-5 py-4 overflow-x-hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {meals?.map((meal, index) => (
              <MealCard key={meal.idMeal + variant + index} meal={meal} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

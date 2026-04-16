import { getRandomMeal } from '@/lib/recipe-api';
import MealCard from '@/components/MealCard';

export default async function RandomPage() {
  const meal = await getRandomMeal();

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
      <MealCard initialMeal={meal} />
    </main>
  );
}

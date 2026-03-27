import { getRandomMeal } from '@/lib/recipe-api';
import MealCard from '@/components/MealCard';

export default async function RandomPage() {
  const meal = await getRandomMeal();

  return (
    <div>
      <MealCard initialMeal={meal} />
    </div>
  );
}

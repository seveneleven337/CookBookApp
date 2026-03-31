import { Meal } from '@/types/recipe-service-type';
import { BASE_URL } from './endpoints';

/*
 * Recipe API functions for fetching meal data from Public TheMealDB API.
 */
export async function getRandomMeal(): Promise<Meal> {
  const res = await fetch(`${BASE_URL}/random.php`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch meal');
  const data = await res.json();
  return data.meals[0];
}

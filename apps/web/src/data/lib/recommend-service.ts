import { Meal } from '@/types/recipe-service-type';
import { RECOMMENDED_RECIPES_URL } from './endpoints';
import { User } from '@/types/user-type';

export async function getRecommendedRecipes(user: User, recipeId: string): Promise<Meal[]> {
  const res = await fetch(`${RECOMMENDED_RECIPES_URL}`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token!}`,
    },
    body: JSON.stringify({
      recipe_id: '53267',
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recommended recipes');
  }
  const data = await res.json();
  return data.recommendations as Meal[];
}

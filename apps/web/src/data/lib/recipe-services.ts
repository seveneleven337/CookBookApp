import { GetRecipeFromServiceType, Recipe } from '@/types/recipe-service-type';
import { RECIPE_API_URL } from './endpoints';

/*
 * Recipe service functions
 */

export async function saveRecipe(mealId: string, category: string, token: string): Promise<Recipe> {
  const res = await fetch(`${RECIPE_API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mealId,
      category,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to save recipe');
  }

  const data = await res.json();
  console.log(data);
  return data;
}

export async function getRecipes(token: string): Promise<GetRecipeFromServiceType[]> {
  const res = await fetch(`${RECIPE_API_URL}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return res.json();
}

export async function deleteRecipe(mealId: string, token: string): Promise<void> {
  console.log(`Deleting recipe with ID: ${mealId}`);
  const res = await fetch(`${RECIPE_API_URL}/meal/${mealId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete recipe');
  }
}

import { Recipe } from '@/types/recipe-service-type';
import { RECIPE_API_URL } from './endpoints';

/*
 * Recipe service functions for saving, fetching, and deleting user recipes from docker service container.
 * These functions interact with the backend API to manage user-specific recipe data.
 *  Each function handles API requests and responses, including error handling for failed requests.
 */

export async function saveRecipe(userId: number, title: string, description: string) {
  const res = await fetch(`${RECIPE_API_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, title, description }),
  });
  if (!res.ok) throw new Error('Failed to save recipe');
  return res.json();
}

export async function getUserRecipes(userId: number): Promise<Recipe[]> {
  const res = await fetch(`${RECIPE_API_URL}/?user_id=${userId}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!id) return null;

  console.log(`[getRecipeById] Fetching recipe with id: ${id}`);
  console.log(`[getRecipeById] URL: ${RECIPE_API_URL}/${id}`);

  try {
    const res = await fetch(`${RECIPE_API_URL}/${id}`, {
      cache: 'no-store',
    });

    console.log(`[getRecipeById] Response status: ${res.status}`);

    if (!res.ok) {
      console.error('Backend returned:', res.status);
      return null;
    }

    const data = await res.json();
    console.log(`[getRecipeById] Received data:`, data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export async function deleteRecipe(recipeId: string) {
  const res = await fetch(`${RECIPE_API_URL}/${recipeId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  // For 204 No Content, no body to parse
  return res.status === 204 ? null : res.json();
}

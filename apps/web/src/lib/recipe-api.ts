const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const RECIPE_API_URL =
  process.env.NEXT_PUBLIC_RECIPE_SERVICE_URL ?? 'http://localhost:5001/api/recipes';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
}

export interface Recipe {
  id: string;
  user_id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export async function getRandomMeal(): Promise<Meal> {
  const res = await fetch(`${BASE_URL}/random.php`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch meal');
  const data = await res.json();
  return data.meals[0];
}

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

export async function deleteRecipe(recipeId: string) {
  const res = await fetch(`${RECIPE_API_URL}/${recipeId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  // For 204 No Content, no body to parse
  return res.status === 204 ? null : res.json();
}

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const RECIPE_API_URL = process.env.NEXT_PUBLIC_RECIPE_SERVICE_URL ?? 'http://localhost:5001/api/recipes';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
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

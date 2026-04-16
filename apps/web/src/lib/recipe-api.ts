const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

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

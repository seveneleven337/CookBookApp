import { Meal } from '@/types/recipe-type';
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

export async function getMealListByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch meal list');
  const data = await res.json();
  if (!data.meals) throw new Error('No meals found for this category');
  console.log('Fetched meals by category:', data.meals);
  return data.meals;
}

export async function getMealByIngredient(ingredient: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch meals by ingredient');
  const data = await res.json();
  if (!data.meals) throw new Error('No meals found with this ingredient');
  console.log('Fetched meals by ingredient:', data.meals);
  return data.meals;
}

export async function getMealById(id: string): Promise<Meal> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch meal by ID');
  const data = await res.json();
  if (!data.meals) throw new Error('Meal not found with this ID');
  console.log('Fetched meal by ID:', data.meals[0]);
  return data.meals[0];
}

import { useQuery } from '@tanstack/react-query';
import { getRandomMeal } from '../lib/recipe-api';

export function useRecipe() {
  return useQuery({
    queryKey: ['randomMeal'],
    queryFn: getRandomMeal,
  });
}

export function useRecipes() {
  return useQuery({
    queryKey: ['randomMeals'],
    queryFn: async () => {
      const meals = await Promise.all(Array.from({ length: 6 }, () => getRandomMeal()));
      return meals;
    },
    staleTime: Infinity,
  });
}

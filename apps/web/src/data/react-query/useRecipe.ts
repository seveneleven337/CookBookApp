import { useQuery } from '@tanstack/react-query';
import {
  getMealById,
  getMealByIngredient,
  getMealListByCategory,
  getRandomMeal,
} from '../lib/recipe-api';
import { mealSanitizer, recipesByFilterSanitizer } from './utils';

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

export function useRecipesByCategory(category: string) {
  return useQuery({
    queryKey: ['mealsByCategory', category],
    queryFn: async () => {
      const meals = await getMealListByCategory(category);
      return recipesByFilterSanitizer(meals, category);
    },
    staleTime: Infinity,
  });
}

export function useRecipesByIngredient(ingredient: string) {
  return useQuery({
    queryKey: ['mealsByIngredient', ingredient],
    queryFn: async () => {
      const meals = await getMealByIngredient(ingredient);
      return recipesByFilterSanitizer(meals, ingredient);
    },
    staleTime: Infinity,
  });
}

export function useRecipeById(id: string) {
  return useQuery({
    queryKey: ['mealById', id],
    queryFn: async () => {
      const meals = await getMealById(id);
      return mealSanitizer(meals);
    },
    staleTime: Infinity,
  });
}

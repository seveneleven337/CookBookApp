import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe, getRecipes, saveRecipe } from '../lib/recipe-services';
import { getMealById } from '../lib/recipe-api';
import { GetRecipeFromServiceType, Meal } from '@/types/recipe-service-type';

export function useSaveRecipe(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mealId, category }: { mealId: string; category: string }) => {
      if (!token) throw new Error('No token');
      return saveRecipe(mealId, category, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedRecipes'] });
    },
  });
}

export function useRecipes(token: string | null) {
  return useQuery({
    queryKey: ['savedRecipes'],
    queryFn: async () => {
      if (!token) throw new Error('No token');
      const recipes = await getRecipes(token);
      return getRecipeDataById(recipes);
    },
    enabled: !!token,
    staleTime: 0,
  });
}

export function useDeleteRecipe(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mealId: string) => {
      if (!token) throw new Error('No token');
      return deleteRecipe(mealId, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedRecipes'] });
    },
  });
}

export async function getRecipeDataById(recipes: GetRecipeFromServiceType[]): Promise<Meal[]> {
  const detailedRecipes = await Promise.all(
    recipes.map(async (recipe) => {
      const detailed = await getMealById(recipe.meal_id);
      const meal: Meal = {
        idMeal: detailed.idMeal,
        strMeal: detailed.strMeal,
        strCategory: detailed.strCategory,
        strArea: detailed.strArea,
        strInstructions: detailed.strInstructions,
        strMealThumb: detailed.strMealThumb,
        strTags: detailed.strTags,
      };
      return meal;
    }),
  );
  console.log(detailedRecipes);
  return detailedRecipes;
}

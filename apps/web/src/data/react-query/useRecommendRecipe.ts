import { useQuery } from '@tanstack/react-query';
import { getRecommendedRecipes } from '../lib/recommend-service';
import { User } from '@/types/user-type';

export function useRecommendedRecipes(user: User, recipeId: string) {
  return useQuery({
    queryKey: ['recommendedRecipes', user, recipeId],
    queryFn: () => getRecommendedRecipes(user, recipeId),
    staleTime: Infinity,
  });
}

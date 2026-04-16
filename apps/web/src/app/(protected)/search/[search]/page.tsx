'use client';

import RecipesFrame from '@/components/RecipesFrame';
import { useRecipesByIngredient } from '@/data/react-query/useRecipe';
import { use } from 'react';

export default function SearchPage({ params }: { params: Promise<{ search: string }> }) {
  const { search } = use(params);

  const { data: meals, isLoading } = useRecipesByIngredient(search);
  if (isLoading || !search) return <div>Loading...</div>;
  return (
    <div>
      <RecipesFrame
        title={search.toUpperCase()}
        subtitle={'*Good food is the foundation for genuine happiness'}
        meals={meals || []}
      />
    </div>
  );
}

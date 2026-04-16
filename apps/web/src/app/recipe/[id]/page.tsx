'use client';
import Recipe from '@/components/recipe';
import { useRecipeById } from '@/data/react-query/useRecipe';
import { use } from 'react';

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: meal, isLoading, isError } = useRecipeById(id);

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (isError || !meal) {
    return <div className="text-center p-6">Recipe not found.</div>;
  }

  return <Recipe meal={meal} />;
}

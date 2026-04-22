'use client';
import NavBar from '@/components/NavBar';
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <Recipe meal={meal} />
      <footer />
    </div>
  );
}

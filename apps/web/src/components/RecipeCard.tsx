'use client';

import { Recipe, deleteRecipe } from '@/data/lib/recipe-api';
import { useState } from 'react';

export default function RecipeCard({
  recipe,
  onDelete,
}: {
  recipe: Recipe;
  onDelete: (recipeId: string) => void;
}) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 1800);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteRecipe(recipe.id);
      showToast('Recipe deleted!');
      onDelete(recipe.id);
    } catch {
      showToast('Failed to delete recipe!');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative rounded-lg shadow bg-white p-4 flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold text-gray-900 flex-1 truncate">{recipe.title}</h2>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="w-10 h-10 rounded-full bg-red-100 text-red-500 text-lg flex-shrink-0 flex items-center justify-center shadow hover:bg-red-200 transition disabled:opacity-50 cursor-pointer"
      >
        {isDeleting ? '...' : '✕'}
      </button>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 right-6 z-50 rounded-lg bg-black/80 px-4 py-2 text-sm text-white"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

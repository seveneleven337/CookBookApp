'use client';
import RecipesFrame from '@/components/RecipesFrame';
import { useRecipesByCategory } from '@/data/react-query/useRecipe';
import { use } from 'react';

const AllowedCategories = {
  breakfast: 'Breakfast',
  vegan: 'Vegan',
  dessert: 'Dessert',
  salad: 'Vegetarian',
} as const;

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const { data: meals, isLoading } = useRecipesByCategory(
    AllowedCategories[category as keyof typeof AllowedCategories],
  );

  if (isLoading || !category) return <div>Loading...</div>;

  return (
    <div>
      <RecipesFrame
        title={category.toUpperCase()}
        subtitle={'*Good food is the foundation for genuine happiness'}
        meals={meals || []}
      />
    </div>
  );
}

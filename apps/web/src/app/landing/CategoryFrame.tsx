import CategoryCard from '@/components/CategoryCard';
import React from 'react';

export default function CategoryFrame() {
  return (
    <div className="flex flex-col w-full h-fit items-center justify-center bg-category-card-bg p-12 gap-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="text-2xl text-primary font-semibold">Explore Categories</div>
        <div className="flex flex-row gap-4  justify-center">
          <CategoryCard title="Breakfast" img="/breakfast.webp" height={200} width={300} />
          <CategoryCard title="Vegan" img="/Vegan.webp" height={200} width={300} />
          <CategoryCard title="Dessert" img="/Dessert.webp" height={200} width={300} />
          <CategoryCard title="Salad" img="/QuickMeal.webp" height={200} width={300} />
        </div>
      </div>
    </div>
  );
}

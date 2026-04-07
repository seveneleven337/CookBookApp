'use client';
import Footer from '@/components/Footer';
import MealCard from '@/components/MealCard';
import NavBar from '@/components/NavBar';
import { useRecipe, useRecipes } from '@/data/react-query/useRecipe';

export default function LandingPage() {
  const { data: meals } = useRecipes();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* nav bar */}
      <NavBar />
      {/* landing content */}
      {/* categories */}

      {/* 6 random recipes */}
      <div className="w-fit flex flex-col items-center gap-y-5 py-10 overflow-x-hidden">
        <div className="flex justify-center gap-5 max-w-full">
          {meals?.slice(0, 3).map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
        <div className="flex justify-center gap-5  max-w-full">
          {meals?.slice(3, 6).map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

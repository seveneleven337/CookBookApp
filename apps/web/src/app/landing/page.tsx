'use client';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import MainFrame from './MainFrame';
import RecipesFrame from './RecipesFrame';
import CategoryFrame from './CategoryFrame';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {/* nav bar */}
      <NavBar />
      {/* landing content */}
      <MainFrame />
      {/* categories */}
      <CategoryFrame />
      {/* 6 random recipes */}
      <RecipesFrame />
      <Footer />
    </div>
  );
}

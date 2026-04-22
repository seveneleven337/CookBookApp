'use client';
import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/data/store/authStore';
import RecipesFrame from '@/components/RecipesFrame';
import ConfirmationMessage from '@/components/ui/ConfirmationMessage';
import { useDeleteRecipe, useRecipes } from '@/data/react-query/useRecipeService';

const CATEGORIES = ['All', 'Breakfast', 'Vegetarian', 'Dessert', 'Salad'] as const;
type Category = (typeof CATEGORIES)[number];

const MyRecipesPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const user = useUserStore((state) => state.user);
  const {
    data: myRecipes,
    isLoading: isMyRecipesLoading,
    error: errorMyRecipesLoading,
  } = useRecipes(user?.token ?? null);
  const [filter, setFilter] = useState<Category>('All');
  const deleteRecipe = useDeleteRecipe(user?.token ?? null);

  if (errorMyRecipesLoading) {
    return <div>Error</div>;
  }

  if (isMyRecipesLoading) {
    return <div>Loading...</div>;
  }

  const clearAll = () => {
    if (myRecipes) {
      myRecipes.forEach((meal) => {
        deleteRecipe.mutate(meal.idMeal);
      });
    }
  };

  const goToHome = () => {
    router.push('/home');
  };

  const filteredRecipes = myRecipes?.filter((meal) => {
    const matchesSearch =
      search.trim() === '' ? true : meal.strMeal.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filter === 'All' ? true : meal.strCategory.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-6xl space-y-8 px-4 py-8 sm:px-6 lg:py-12">
        {/* Header section */}
        <section className="rounded-3xl bg-category-card-bg px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-text-title sm:text-4xl">
                My Recipes
              </h1>
              <p className="text-sm text-text-subtitle sm:text-base">
                Your personal collection of saved recipes. Filter, search and manage them.
              </p>
            </div>
            {(myRecipes?.length ?? 0) > 0 && (
              <ConfirmationMessage
                title="Remove all saved recipes?"
                description={
                  'This will delete all ' +
                  (myRecipes?.length ?? 0) +
                  ' saved recipes from your profile. This action cannot be undone.'
                }
                buttonText="Remove All"
                onClick={clearAll}
              />
            )}
          </div>
        </section>

        {/* Filters */}
        <section className="space-y-4">
          <fieldset className="flex flex-row border border-gray-200 rounded-full px-4 py-4 bg-input-bg focus-within:border-primary transition mt-8 w-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your recipes..."
              className="w-full outline-none text-input-text bg-transparent text-md"
            />
          </fieldset>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={
                    active
                      ? 'rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground'
                      : 'rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-nav-item hover:bg-muted'
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid */}
        {(myRecipes?.length ?? 0) === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <Bookmark className="h-10 w-10 text-text-subtitle" />
            <h3 className="text-lg font-semibold text-text-title">No recipes found</h3>
            <p className="max-w-sm text-sm text-text-subtitle">
              {(myRecipes?.length ?? 0) === 0
                ? "You haven't saved any recipes yet. Browse the home page and save your favorites."
                : 'Try a different category or search term.'}
            </p>
            <button
              className="mt-2 rounded-full bg-form-btn-bg px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-form-btn-bg-hover"
              onClick={goToHome}
            >
              Discover recipes
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col w-fit gap-4  items-center">
              <RecipesFrame
                title={'Recommended For Your Kitchen'}
                subtitle={'*Handpicked recipes just for you'}
                meals={filteredRecipes ?? []}
                variant="myRecipe"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRecipesPage;

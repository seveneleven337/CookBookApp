import { RecipeIngredients, RecipeTagList, RecipeVideo } from './RecipeParts';
import Image from 'next/image';
import Tag from './Tag';
import { Meal } from '@/types/recipe-service-type';

function getIngredients(meal: Meal) {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }
  return ingredients;
}

export default function Recipe({ meal }: { meal: Meal }) {
  const ingredients = getIngredients(meal);
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
        {/* Hero Image */}
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={1280}
            height={720}
            className="h-56 w-full object-cover sm:h-72 md:h-96"
            loading="eager"
          />
        </div>

        {/* Title + Meta */}
        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-text-title sm:text-4xl lg:text-5xl">
            {meal.strMeal}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {meal.strCategory && <Tag text={meal.strCategory} variant="secondary" />}
            {meal.strArea && <Tag text={meal.strArea} variant="secondary" />}
          </div>

          {meal.strTags && (
            <RecipeTagList tags={meal.strTags.split(',').map((tag) => tag.trim()) || []} />
          )}
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* Left Column: Ingredients & Video */}
          <aside className="space-y-8 lg:col-span-2">
            {/* Ingredients */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                {/*                 <ShoppingBasket className="h-5 w-5 text-text-title-variant" />
                 */}{' '}
                <h2 className="text-xl font-semibold text-text-title">Ingredients</h2>
              </div>
              <RecipeIngredients ingredients={ingredients} />
            </section>

            {/* Video */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-text-title">Video Tutorial</h2>
              </div>
              {meal.strYoutube && <RecipeVideo youtubeUrl={meal.strYoutube} />}
            </section>
          </aside>

          {/* Right Column: Instructions */}
          <section className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-text-title">Instructions</h2>
            </div>
            <div className="space-y-4 rounded-xl border border-recipe-border bg-recipe-bg p-5 sm:p-6">
              {meal.strInstructions &&
                meal.strInstructions.split('\n\n').map((step, i) => (
                  <p key={i} className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                    {step}
                  </p>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

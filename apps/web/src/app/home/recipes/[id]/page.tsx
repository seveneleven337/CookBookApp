import { Recipe } from '@/types/recipe-service-type';
import { getRecipeById } from '@/data/lib/recipe-services';

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const recipe: Recipe | null = await getRecipeById(id);

  if (!recipe) {
    return (
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-6">Recipe Not Found</h1>
        <p className="text-gray-600">This recipe does not exist.</p>
      </div>
    );
  }

  return (
    <div className="pt-4 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{recipe.title}</h1>

      {recipe.description ? (
        <>
          <p className="text-gray-700 mt-4 whitespace-pre-wrap">{recipe.id}</p>
          <h2 className="text-xl font-semibold mt-8">Instructions</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">{recipe.description}</p>
        </>
      ) : (
        <p className="text-gray-600">No description available.</p>
      )}
    </div>
  );
}

export default function RecipesPage() {
  /*  const { user } = useAuthStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 1800);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserRecipes(user.id);
        setRecipes(data);
      } catch (error) {
        showToast('Failed to load recipes!');
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleDelete = (recipeId: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  if (!user) {
    return (
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Recipes</h1>
        <p className="text-gray-600">Please log in to view your recipes.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Recipes</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-600">No recipes saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </div>
      )}

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
  ); */
  return null;
}

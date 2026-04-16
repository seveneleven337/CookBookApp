import Tag from './Tag';

interface RecipeTagProps {
  tags: string[];
}

const RecipeTagList = ({ tags }: RecipeTagProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <Tag key={tag} text={tag} />
    ))}
  </div>
);

interface RecipeVideoProps {
  youtubeUrl: string;
}

const RecipeVideo = ({ youtubeUrl }: RecipeVideoProps) => {
  const videoId = youtubeUrl.includes('v=')
    ? youtubeUrl.split('v=')[1]?.split('&')[0]
    : youtubeUrl.split('/').pop();

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Recipe video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

interface RecipeIngredientsProps {
  ingredients: { ingredient: string; measure: string }[];
}

const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <div className="space-y-3">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg border border-recipe-border bg-recipe-bg p-3 transition-colors hover:bg-card/80"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {index + 1}
          </span>
          <div className="flex-1 text-sm">
            <span className="font-medium text-text-title">{ingredient.ingredient}</span>
            {ingredient.measure && (
              <span className="ml-2 text-muted-foreground">— {ingredient.measure}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { RecipeTagList, RecipeVideo, RecipeIngredients };

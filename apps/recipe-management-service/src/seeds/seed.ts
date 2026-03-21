import Recipe from '../models/Recipe';

export const seedRecipes = async () => {
  const count = await Recipe.count();
  if (count === 0) {
    await Recipe.create({
      userId: 1,
      title: 'Sample recipe',
      description: 'Seeded example recipe',
    });
  }
};

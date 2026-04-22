import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe, getRecipes, saveRecipe } from '../lib/recipe-services';
import { getMealById } from '../lib/recipe-api';
import { GetRecipeFromServiceType, Meal, Meal, Recipe } from '@/types/recipe-service-type';

const myRecipes = [
  {
    idMeal: '53253',
    strMeal: 'Imam bayildi with BBQ lamb & tzatziki',
    strCategory: 'Lamb',
    strArea: 'Turkish',
    strInstructions:
      'step 1\r\nHeat oven to 190C/170C fan/gas 5. Halve the aubergines lengthways and score the flesh side deeply, brush with a good layer of olive oil and put on a baking sheet. Roast for 20 mins or until the flesh is soft enough to scoop out.\r\n\r\nstep 2\r\nFry the onion in a little oil until soft, add the garlic and cinnamon and fry for 1 min. Once the aubergines are cool enough to handle, scoop out the centres. Roughly chop the flesh and add it to the onions. Halve the tomatoes, scoop the seeds and juice into a sieve set over a bowl, then chop the flesh. Add the chopped tomatoes to the pan and cook everything for 10 mins until nice and soft. Add a little more oil if you need to. Stir in the parsley, leaving a little for scattering at the end.\r\n\r\nstep 3\r\nLay the aubergine halves in a baking dish and divide the tomato mixture between them. Pour over the juice from the tomatoes, drizzle with more olive oil and bake for 30 mins until the aubergines have collapsed.\r\n\r\nstep 4\r\nMeanwhile, mix the tzatziki ingredients together and put in a small serving bowl.\r\n\r\nstep 5\r\nSeason the lamb with salt, black pepper and a pinch of paprika. Griddle, grill or barbecue for 3 mins on each side or until the fat is nicely browned, then put in a serving dish and squeeze over the lemon halves. Scatter the aubergines with parsley, then serve with the lamb and tzatziki.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ampz9v1763787134.jpg',
    strTags: '',
  },
  {
    idMeal: '53313',
    strMeal: 'Beetroot latkes',
    strCategory: 'Vegetarian',
    strArea: 'Ukrainian',
    strInstructions:
      'step 1\r\nHeat the oven to 180C/160C fan/gas 4. Make the latkes by combining all of the ingredients.\r\n\r\nstep 2\r\nHeat the oil in a large non-stick pan. Spoon in the mixture to make six round latkes. Fry for 4-5 mins on each side, then transfer to a baking sheet and bake for 10 mins.\r\n\r\nstep 3\r\nCombine the yogurt and mint in a small bowl. Toss the salad leaves and tomatoes together, then serve the latkes with the mint yogurt and salad.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qwicc91764368097.jpg',
    strTags: '',
  },
  {
    idMeal: '53267',
    strMeal: 'Aubergine couscous salad',
    strCategory: 'Vegetarian',
    strArea: 'Turkish',
    strInstructions:
      'step 1\r\nHeat grill to high. Put the aubergine on a baking sheet, brush with oil and season. Grill for about 15 mins, turning and brushing with more oil halfway, until browned and softened.\r\n\r\nstep 2\r\nMeanwhile, tip the couscous into a large bowl, pour over the stock, then cover and leave for 10 mins. Mix the tomatoes, mint, goat’s cheese and remaining oil together. Fluff the couscous up with a fork, then stir in the aubergines, tomato mixture and lemon juice.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/02s6gc1763799560.jpg',
    strTags: '',
  },
  {
    idMeal: '53030',
    strMeal: 'Feteer Meshaltet',
    strCategory: 'Side',
    strArea: 'Egyptian',
    strInstructions:
      'Mix the flour and salt then pour one cup of water and start kneading.\r\nIf you feel the dough is still not coming together or too dry, gradually add the remaining water until you get a dough that is very elastic so that when you pull it and it won’t be torn.\r\nLet the dough rest for just 10 minutes then divide the dough into 6-8 balls depending on the size you want for your feteer.\r\nWarm up the butter/ghee or oil you are using and pour into a deep bowl.\r\nImmerse the dough balls into the warm butter. Let it rest for 15 to 20 minutes.\r\nPreheat oven to 550F.\r\nStretch the first ball with your hands on a clean countertop. Stretch it as thin as you can, the goal here is to see your countertop through the dough.\r\nFold the dough over itself to form a square brushing in between folds with the butter mixture.\r\nSet aside and start making the next ball.\r\nStretch the second one thin as we have done for the first ball.\r\nPlace the previous one on the middle seam side down. Fold the outer one over brushing with more butter mixture as you fold. Set aside.\r\nKeep doing this for the third and fourth balls. Now we have one ready, place on a 10 inch baking/pie dish seam side down and brush the top with more butter.\r\nRepeat for the remaining 4 balls to make a second one. With your hands lightly press the folded feteer to spread it on the baking dish.\r\nPlace in preheated oven for 10 minutes when the feteer starts puffing turn on the broiler to brown the top.\r\nWhen it is done add little butter on top and cover so it won’t get dry.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/9f4z6v1598734293.jpg',
    strTags: '',
  },
  {
    idMeal: '53160',
    strMeal: 'Pisto con huevos',
    strCategory: 'Vegetarian',
    strArea: 'Spanish',
    strInstructions:
      'step 1\r\nHeat the oil in a large flameproof casserole dish or a cast-iron skillet over a low heat. Add the onions and a sprinkle of salt, cover and cook gently for 15 mins, stirring occasionally. Add the garlic and cook for another 2 mins.\r\n\r\nstep 2\r\nNext, throw in the peppers and cook over a medium heat, covered, for about 5 mins, stirring every so often, until the peppers are just tender.\r\n\r\nstep 3\r\nMix in the oregano, thyme, bay leaves, some black pepper and a little salt, if needed. Tip in the courgettes and aubergine, combine thoroughly, and cook over a medium heat, covered, for 10 mins. Stir in the tomatoes, cover and cook for 20 mins, stirring occasionally.\r\n\r\nstep 4\r\nCarefully crack the eggs over the pisto – try not to break the yolks. Cook in the sauce on a medium heat for 5-6 mins until the eggs are cooked through but still a little soft, then scatter with parsley before serving',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/0nswfe1763279040.jpg',
    strTags: '',
  },
  {
    idMeal: '53306',
    strMeal: 'Pork rib bortsch',
    strCategory: 'Pork',
    strArea: 'Polish',
    strInstructions:
      'step 1\r\nCut the meat into large pieces, put in your largest saucepan and cover with 5 litres water. Bring to the boil over a high heat, skimming away any foam that rises to the surface. Add the bay leaves. Season. Turn the heat down to a simmer and cook for 1 hr, or until the meat is soft and falls off the bone. Add the beans if using dried.\r\n\r\nstep 2\r\nTurn the heat up. Bring back to the boil, then reduce the heat and simmer for another 20 mins – the beans should still be slightly raw. Add the carrots, onions, garlic and pepper. Stir well, then add the chillies, if using. Cook for 15 mins more.\r\n\r\nstep 3\r\nStir in the beetroot and cook for 10 mins before adding the potatoes. After 15 mins, add the tomato purée to taste and beans, if using canned, and bring to the boil. Cook for 5 mins, add the cabbage and cook for 5 mins more. Season, then garnish with the parsley and dill. Turn off the heat and leave to stand for 5 mins. Serve with soured cream on the side.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/om5hsl1764364721.jpg',
    strTags: '',
  },
  {
    idMeal: '53199',
    strMeal: 'Thai beef stir-fry',
    strCategory: 'Beef',
    strArea: 'Thai',
    strInstructions:
      'step 1\r\nHeat a wok or large frying pan until smoking hot. Pour in the oil and swirl around the pan, then tip in the beef strips and chilli. Cook, stirring all the time, until the meat is lightly browned, about 3 mins, then pour over the oyster sauce. Cook until heated through and the sauce coats the meat. stir in the basil leaves and serve with plain rice.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/kyuxew1763479470.jpg',
    strTags: '',
  },
];

export function useSaveRecipe(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mealId, category }: { mealId: string; category: string }) => {
      if (!token) throw new Error('No token');
      return saveRecipe(mealId, category, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedRecipes'] });
    },
  });
}

export function useRecipes(token: string | null) {
  return useQuery({
    queryKey: ['savedRecipes'],
    queryFn: async () => {
      if (!token) throw new Error('No token');
      const recipes = await getRecipes(token);
      return getRecipeDataById(recipes);
    },
    enabled: !!token,
    staleTime: 0,
  });
}

export function useDeleteRecipe(token: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mealId: string) => {
      if (!token) throw new Error('No token');
      return deleteRecipe(mealId, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedRecipes'] });
    },
  });
}

export async function getRecipeDataById(recipes: GetRecipeFromServiceType[]): Promise<Meal[]> {
  const detailedRecipes = await Promise.all(
    recipes.map(async (recipe) => {
      const detailed = await getMealById(recipe.meal_id);
      const meal: Meal = {
        idMeal: detailed.idMeal,
        strMeal: detailed.strMeal,
        strCategory: detailed.strCategory,
        strArea: detailed.strArea,
        strInstructions: detailed.strInstructions,
        strMealThumb: detailed.strMealThumb,
        strTags: detailed.strTags,
      };
      return meal;
    }),
  );
  console.log(detailedRecipes);
  return detailedRecipes;
}

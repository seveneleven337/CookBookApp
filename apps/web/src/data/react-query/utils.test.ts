import { mealSanitizer, recipesByFilterSanitizer } from './utils';
/* eslint-disable  @typescript-eslint/no-explicit-any */

describe('recipesByFilterSanitizer', () => {
  const validMeals = [
    {
      idMeal: '1',
      strMeal: 'Pizza',
      strMealThumb: 'image.jpg',
    },
  ];

  it('should sanitize valid meals correctly', () => {
    const result = recipesByFilterSanitizer(validMeals, 'Italian');

    expect(result).toEqual([
      {
        idMeal: '1',
        strMeal: 'Pizza',
        strCategory: 'Italian',
        strArea: '',
        strInstructions: '',
        strMealThumb: 'image.jpg',
        strTags: '',
      },
    ]);
  });

  it('should throw error if meals is not an array', () => {
    expect(() => recipesByFilterSanitizer(null as any, 'Italian')).toThrow(
      'Invalid data format: expected an array of meals',
    );
  });

  it('should throw error if meal has invalid structure', () => {
    const invalidMeals = [
      {
        idMeal: 1, // invalid
        strMeal: 'Pizza',
        strMealThumb: 'image.jpg',
      },
    ];

    expect(() => recipesByFilterSanitizer(invalidMeals as any, 'Italian')).toThrow(
      'Invalid meal data format',
    );
  });
});

describe('mealSanitizer', () => {
  it('should sanitize a valid meal object', () => {
    const meal = {
      idMeal: '1',
      strMeal: 'Burger',
      strCategory: 'Fast Food',
      strArea: 'USA',
      strInstructions: 'Cook it',
      strMealThumb: 'img.jpg',
      strTags: 'Fast',
      strYoutube: 'youtube-link',
      strIngredient1: 'Meat',
      strMeasure1: '200g',
    };

    const result = mealSanitizer(meal);

    expect(result).toMatchObject({
      idMeal: '1',
      strMeal: 'Burger',
      strCategory: 'Fast Food',
      strArea: 'USA',
      strInstructions: 'Cook it',
      strMealThumb: 'img.jpg',
      strTags: 'Fast',
      strYoutube: 'youtube-link',
      strIngredient1: 'Meat',
      strMeasure1: '200g',
    });
  });

  it('should set empty strings for invalid primitive fields', () => {
    const meal = {
      idMeal: 123,
      strMeal: null,
    };

    const result = mealSanitizer(meal);

    expect(result.idMeal).toBe('');
    expect(result.strMeal).toBe('');
  });

  it('should set undefined for empty ingredient/measure', () => {
    const meal = {
      strIngredient1: '   ',
      strMeasure1: '',
    };

    const result = mealSanitizer(meal);

    expect(result.strIngredient1).toBeUndefined();
    expect(result.strMeasure1).toBeUndefined();
  });

  it('should throw error if input is not an object', () => {
    expect(() => mealSanitizer(null)).toThrow('Invalid meal data');
    expect(() => mealSanitizer(undefined)).toThrow('Invalid meal data');
  });

  it('should handle missing optional fields', () => {
    const meal = {};

    const result = mealSanitizer(meal);

    expect(result.strYoutube).toBeUndefined();
  });
});

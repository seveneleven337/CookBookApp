/* eslint-disable @typescript-eslint/no-explicit-any */
import { getIngredients } from './recipe';

describe('getIngredients', () => {
  it('should return only valid ingredients with measures', () => {
    const meal: any = {
      strIngredient1: 'Chicken',
      strMeasure1: '200g',
      strIngredient2: 'Salt',
      strMeasure2: '1 tsp',
      strIngredient3: '',
      strMeasure3: 'ignored',
      strIngredient4: null,
      strMeasure4: 'ignored',
    };

    const result = getIngredients(meal);

    expect(result).toEqual([
      { ingredient: 'Chicken', measure: '200g' },
      { ingredient: 'Salt', measure: '1 tsp' },
    ]);
  });

  it('should return empty array if no valid ingredients', () => {
    const meal: any = {};

    const result = getIngredients(meal);

    expect(result).toEqual([]);
  });

  it('should ignore ingredients with only whitespace', () => {
    const meal: any = {
      strIngredient1: '   ',
      strMeasure1: '1 cup',
      strIngredient2: 'Tomato',
      strMeasure2: '2 pcs',
    };

    const result = getIngredients(meal);

    expect(result).toEqual([{ ingredient: 'Tomato', measure: '2 pcs' }]);
  });

  it('should default measure to empty string if not provided', () => {
    const meal: any = {
      strIngredient1: 'Rice',
      strMeasure1: null,
    };

    const result = getIngredients(meal);

    expect(result).toEqual([{ ingredient: 'Rice', measure: '' }]);
  });
});

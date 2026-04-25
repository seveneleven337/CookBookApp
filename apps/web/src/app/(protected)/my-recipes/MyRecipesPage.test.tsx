/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react';
import MyRecipesPage from './page';

// mocks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/data/store/authStore', () => ({
  useUserStore: () => ({
    user: { token: 'fake-token' },
  }),
}));

jest.mock('@/data/react-query/useRecipeService', () => ({
  useRecipes: () => ({
    data: [
      {
        idMeal: '1',
        strMeal: 'Pasta',
        strCategory: 'Dinner',
      },
    ],
    isLoading: false,
    error: null,
  }),
  useDeleteRecipe: () => ({
    mutate: jest.fn(),
  }),
}));

jest.mock('@/components/RecipesFrame', () => () => <div data-testid="recipes-frame" />);

jest.mock('@/components/ui/ConfirmationMessage', () => (props: any) => (
  <button onClick={props.onClick}>Remove All</button>
));

describe('MyRecipesPage', () => {
  it('renders recipes when data exists', () => {
    render(<MyRecipesPage />);

    expect(screen.getByTestId('recipes-frame')).toBeInTheDocument();
  });

  it('calls clearAll when clicking remove all', () => {
    render(<MyRecipesPage />);

    const button = screen.getByText('Remove All');
    fireEvent.click(button);
  });
});

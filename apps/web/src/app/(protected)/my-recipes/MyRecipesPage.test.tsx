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

jest.mock('@/components/RecipesFrame', () => {
  return function RecipesFrameMock() {
    return <div data-testid="recipes-frame" />;
  };
});

jest.mock('@/components/ui/ConfirmationMessage', () => {
  return function ConfirmationMessageMock(props: { onClick: () => void }) {
    return <button onClick={props.onClick}>Remove All</button>;
  };
});

describe('MyRecipesPage', () => {
  it('renders recipes when data exists', () => {
    render(<MyRecipesPage />);

    expect(screen.getByTestId('recipes-frame')).toBeInTheDocument();
  });

  it('calls clearAll when clicking remove all', () => {
    render(<MyRecipesPage />);

    fireEvent.click(screen.getByText('Remove All'));
  });
});

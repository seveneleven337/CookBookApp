/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './page';

// mocks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/data/react-query/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    error: null,
  }),
}));

jest.mock('@/data/store/authStore', () => ({
  useUserStore: (selector: any) =>
    selector({
      user: null,
    }),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('@sentry/nextjs', () => ({
  captureMessage: jest.fn(),
}));

describe('LoginPage', () => {
  it('should show error if fields are empty', () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText('Please enter email and password')).toBeInTheDocument();
  });
});

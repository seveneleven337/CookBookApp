import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from './page';

// mocks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/data/react-query/useAuth', () => ({
  useAuth: () => ({
    register: jest.fn(),
    isRegistered: false,
    error: null,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('RegisterPage', () => {
  it('should show error if fields are empty', () => {
    render(<RegisterPage />);

    const button = screen.getByText('Register');
    fireEvent.click(button);

    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
  });
});

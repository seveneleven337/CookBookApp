import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '@/data/lib/auth-service';
import { useUserStore } from '@/data/store/authStore';

export function useAuth() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  // Login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data); // data ya es User
    },
  });

  // Register
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const logout = () => {
    clearUser();
    // Aquí puedes llamar al endpoint de logout si existe
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggedIn: loginMutation.isSuccess,
    isRegistered: registerMutation.isSuccess,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isError: loginMutation.isError || registerMutation.isError,
    error: (loginMutation.error || registerMutation.error) as Error | null,
  };
}

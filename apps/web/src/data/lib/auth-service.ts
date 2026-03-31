import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/types/auth-service-type';
import { AUTH_API_URL } from './endpoints';
import { User } from '@/types/user-type';

/*
 * Auth service functions for user registration and login, interacting with the backend authentication API.
 * Each function sends appropriate API requests and handles responses, including error handling for failed requests.
 */

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const res = await fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  const user: User = {
    ...data.user,
    token: data.token,
  };
  return user;
}

export async function loginUser(payload: LoginPayload): Promise<User> {
  const res = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  const user: User = {
    ...data.user,
    token: data.token,
  };
  return user;
}

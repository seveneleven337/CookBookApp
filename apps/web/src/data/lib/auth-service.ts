import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/types/auth-service-type';
import { AUTH_API_URL } from './endpoints';

/*
 * Auth service functions for user registration and login, interacting with the backend authentication API.
 * Each function sends appropriate API requests and handles responses, including error handling for failed requests.
 */

async function checkResponse(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error || res.statusText || 'Auth service error';
    throw new Error(message);
  }
  return res.json();
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const res = await fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  return checkResponse(res);
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  return checkResponse(res);
}

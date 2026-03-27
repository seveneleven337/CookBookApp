export interface RegisterPayload {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  };
  token?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  };
}

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ?? 'http://localhost:4000/api/auth';

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

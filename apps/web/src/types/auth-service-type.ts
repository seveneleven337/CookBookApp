export type RegisterPayload = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  };
  token?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  };
};

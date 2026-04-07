export type RegisterPayload = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

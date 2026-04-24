//dotenv configuration is used on local development environment when is use npm run dev
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.dev' });
import * as Sentry from '@sentry/node';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET } from '../config/env';

interface AuthInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

if (!JWT_SECRET) throw new Error('JWT_SECRET not defined');

export const createUser = async ({ name, lastName, email, password }: AuthInput) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, lastName, email, password: hashedPassword });
  return { id: user.id, name: user.name, lastName: user.lastName, email: user.email };
};

export const authenticateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    Sentry.captureException(new Error('Invalid credentials'));
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    Sentry.captureException(new Error('Invalid credentials'));
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '6h',
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

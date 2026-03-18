import User from '../models/User';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  await User.findOrCreate({
    where: { email: 'doe@example.com' },
    defaults: {
      name: 'John',
      lastName: 'Doe',
      password: hashedPassword,
    },
  });
};

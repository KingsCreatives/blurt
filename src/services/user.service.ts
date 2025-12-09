import { User } from '../schemas/user.schemas';
import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/password';

interface loginProp {
  email: string;
  password: string;
}

export const createUser = async (data: User) => {
  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return user;
};


export const login = async (data: loginProp) => {
 
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await comparePassword(data.password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

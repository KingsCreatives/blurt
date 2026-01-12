import { prisma } from '../../lib/prisma';
import { generateToken } from '../../utils/jwt';
import { comparePassword, hashPassword } from '../../utils/password';
import { User } from '../../schemas/user.schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

interface LoginProps {
  email: string;
  password: string;
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
    this.name = 'UserAlreadyExistsError';
  }
}

export const registerUser = async (data: User) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new UserAlreadyExistsError();
    }

    throw error;
  }
};

export const loginUser = async (data: LoginProps) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValidPassword = await comparePassword(data.password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: token,
  };
};

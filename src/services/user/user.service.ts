import { User } from '../../schemas/user.schemas';
import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../utils/password';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
    this.name = 'UserAlreadyExistsError';
  }
}

export const createUser = async (data: User) => {
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

export const updateUserAvatar = async (userId: string, avatar: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { avatar },
  });
};

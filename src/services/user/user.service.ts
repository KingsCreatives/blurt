import { prisma } from '../../lib/prisma';

export const updateUserAvatar = async (userId: string, avatar: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { avatar },
  });
};

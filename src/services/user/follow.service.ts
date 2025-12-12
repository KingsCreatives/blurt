import { prisma } from '../../lib/prisma';

export const followUser = async (followerId: string, targetUserId: string) => {
  if (followerId === targetUserId) {
    throw new Error('You cannot follow yourself');
  }

  const targetExists = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!targetExists) {
    throw new Error('User to follow not found.');
  }

  try {
    const follow = await prisma.follows.create({
      data: {
        followerId: followerId,
        followingId: targetUserId,
      },
    });

    return follow;
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('You are already following this user.');
    }
    throw error;
  }
};

export const unfollowerUser = async (followerId: string, targetUserId: string) => {
  try {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: targetUserId,
        },
      },
    });
    return { message: 'Unfollowed successfully' };
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error('You are not following this user.');
    }
    throw error;
  }
};

import { prisma } from '../lib/prisma';

export const getFeed = async (currentUserId: string) => {
  const following = await prisma.follows.findMany({
    where: {
      followerId: currentUserId,
    },
    select: {
      followingId: true,
    },
  });

  const followingIds = following.map((f) => f.followingId);

  const tweets = await prisma.tweet.findMany({
    where: {
      authorId: {
        in: followingIds,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });

  return tweets;
};

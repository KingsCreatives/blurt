import { prisma } from '../../lib/prisma';

export const getFeed = async (
  userId: string,
  limit: number = 10,
  cursor?: string
) => {
  
  const following = await prisma.follows.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const followingIds = following.map((f) => f.followingId);

  const tweets = await prisma.tweet.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      authorId: { in: followingIds },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: { username: true, email: true },
      },
    },
  });

  let nextCursor: string | null = null;

  if (tweets.length === limit) {
    nextCursor = tweets[tweets.length - 1].id;
  }

  return {
    tweets,
    nextCursor,
  };
};

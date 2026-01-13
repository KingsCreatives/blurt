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

  const followingIds = following.map(
    (f: { followingId: string }) => f.followingId
  );

  followingIds.push(userId);

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

export const createTweet = async (userId: string, content: string) => {
  return await prisma.tweet.create({
    data: {
      content,
      authorId: userId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
};

export const updateTweet = async (
  tweetId: string,
  userId: string,
  content: string
) => {
  const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });

  if (!tweet) {
    throw new Error('Tweet not found');
  }

  if (tweet.authorId !== userId) {
    throw new Error('Not allowed to edit this tweet');
  }

  return prisma.tweet.update({
    where: { id: tweetId },
    data: {
      content,
    },
  });
};

export const removeTweet = async (tweetId: string, userId: string) => {
  const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });

  if (!tweet) {
    throw new Error('Tweet not found');
  }

  if (tweet.authorId !== userId) {
    throw new Error('Not allowed to delete this tweet');
  }

  return await prisma.tweet.delete({ where: { id: tweetId } });
};

export const getTweet = async (tweetId: string) => {
  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId },
    select: {
      id: true,
      content: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  if (!tweet) {
    throw new Error('Tweet not found');
  }

  return tweet;
};

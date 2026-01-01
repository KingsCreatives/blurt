import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { followUser, unfollowerUser } from '../services/user/follow.service';
import { AuthRequest } from '../middleware/authMiddleware';

export const follow = async (req: AuthRequest, res: Response) => {
  const followerId = req.user?.id;
  const followingId = req.params.id;

  if (!followerId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'User not authenticated' });
  }

  try {
    await followUser(followerId, followingId);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Followed successfully' });
  } catch (error: any) {
    if (
      error.message === 'You cannot follow yourself' ||
      error.message.includes('already following')
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong' });
  }
};

export const unfollow = async (req: AuthRequest, res: Response) => {
  const followerId = req.user?.id;
  const followingId = req.params.id;

  if (!followerId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'User not authenticated' });
  }

  try {
    await unfollowerUser(followerId, followingId);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Unfollowed successfully' });
  } catch (error: any) {
    if (error.message.includes('not following')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong' });
  }
};

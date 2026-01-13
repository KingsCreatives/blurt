import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateTweetSchema, UpdateTweetSchema } from '../schemas/tweet.schema';
import {
  createTweet,
  getFeed,
  updateTweet,
  removeTweet,
  getTweet,
} from '../services/tweet/tweet.service';

export const postTweet = async (req: Request, res: Response) => {
  const validate = CreateTweetSchema.safeParse(req.body);
  if (!validate.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validate.error.format });
  }
  const userId = req.user?.id;
  const { content } = validate.data;
  try {
    const tweet = await createTweet(userId!, content);
    return res.status(StatusCodes.CREATED).json({
      message: 'Tweet created successfully',
      data: tweet,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create tweet' });
  }
};

export const getTimeline = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const feed = await getFeed(userId!);
    return res.status(StatusCodes.OK).json(feed);
  } catch (error) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE);
  }
};

export const editTweet = async (req: Request, res: Response) => {
  const validation = UpdateTweetSchema.safeParse(req.body);

  if (!validation.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validation.error.format });
  }

  const tweetId = req.params.id;
  const userId = req.user?.id;
  const { content } = validation.data;
  try {
    const tweet = await updateTweet(tweetId, userId!, content);
    return res.status(StatusCodes.OK).json(tweet);
  } catch (error: any) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: error.message });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  const tweetId = req.params.id;
  const userId = req.user?.id;
  try {
    await removeTweet(tweetId, userId!);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Tweet deleted successfully' });
  } catch (error: any) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: error.message });
  }
};

export const findTweet = async (req: Request, res: Response) => {
  const tweetId = req.params.id;

  try {
    const tweet = await getTweet(tweetId);
    return res.status(StatusCodes.OK).json({
      message: 'Tweet returned successfully',
      data: tweet,
    });
  } catch (error: any) {
    if (error.message === 'Tweet not found') {
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateTweetSchema } from '../schemas/tweet.schema';
import { createTweet, getFeed } from '../services/tweet/tweet.service';

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
    await createTweet(userId!, content);
    return res.status(StatusCodes.CREATED).json({
      content: content,
    });
  } catch (error) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE);
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

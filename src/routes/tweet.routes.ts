import { Router } from 'express';
import { getTimeline, postTweet } from '../controllers/tweet.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const tweetRouter = Router();

tweetRouter.post('/', authMiddleware, postTweet);
tweetRouter.get('/', authMiddleware, getTimeline);

export default tweetRouter;

import { Router } from 'express';
import { getTimeline, postTweet } from '../controllers/tweet.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const tweetRouter = Router();

/**
 * @openapi
 * /tweets:
 *   post:
 *     summary: Create a new tweet
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Hello Blurt 👋
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *       401:
 *         description: Unauthorized
 */
tweetRouter.post('/', authMiddleware, postTweet);
/**
 * @openapi
 * /tweets:
 *   get:
 *     summary: Get user timeline
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tweets
 *       401:
 *         description: Unauthorized
 */
tweetRouter.get('/', authMiddleware, getTimeline);

export default tweetRouter;

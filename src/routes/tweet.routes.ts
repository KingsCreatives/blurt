import { Router } from 'express';
import {
  getTimeline,
  postTweet,
  editTweet,
  deleteTweet,
  findTweet,
} from '../controllers/tweet.controller';
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
/**
 * @openapi
 * /tweets/{id}:
 *   patch:
 *     summary: Edit a tweet
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *                 example: Updated tweet content
 *     responses:
 *       200:
 *         description: Tweet updated successfully
 *       403:
 *         description: Not allowed to edit this tweet
 *       404:
 *         description: Tweet not found
 */
tweetRouter.patch('/:id', authMiddleware, editTweet);
/**
 * @openapi
 * /tweets/{id}:
 *   delete:
 *     summary: Delete a tweet
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tweet deleted successfully
 *       403:
 *         description: Not allowed to delete this tweet
 *       404:
 *         description: Tweet not found
 */
tweetRouter.delete('/:id', authMiddleware, deleteTweet);
/**
 * @openapi
 * /tweets/{id}:
 *   get:
 *     summary: Get a single tweet
 *     tags:
 *       - Tweets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tweet returned successfully
 *       404:
 *         description: Tweet not found
 */
tweetRouter.get('/:id', findTweet);

export default tweetRouter;

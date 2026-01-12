import { Router } from 'express';
import { uploadAvatarController, getMe } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { follow, unfollow } from '../controllers/follow.controller';
import { uploadAvatar } from '../lib/multer';

const userRouter = Router();

/**
 * @openapi
 * /user/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data
 *       401:
 *         description: Unauthorized
 */

userRouter.post('/me', authMiddleware, getMe);
/**
 * @openapi
 * /user/{id}/follow:
 *   post:
 *     summary: Follow a user
 *     tags:
 *       - Users
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
 *         description: User followed successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/:id/follow', authMiddleware, follow);
/**
 * @openapi
 * /user/{id}/unfollow:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Users
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
 *         description: User unfollowed successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.delete('/:id/unfollow', authMiddleware, unfollow);
/**
 * @openapi
 * /user/me/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.post(
  '/me/avatar',
  authMiddleware,
  uploadAvatar.single('avatar'),
  uploadAvatarController
);

export default userRouter;

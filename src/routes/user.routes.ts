import { Router } from 'express';
import {
  createUserController,
  uploadAvatarController,
} from '../controllers/user.controller';
import { validateData } from '../middleware/validationMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserSchema } from '../schemas/user.schemas';
import { follow, unfollow } from '../controllers/follow.controller';
import { uploadAvatar } from '../lib/multer';

const userRouter = Router();

userRouter.post('/', validateData(UserSchema), createUserController);
userRouter.post('/:id/follow', authMiddleware, follow);
userRouter.delete('/:id/unfollow', authMiddleware, unfollow);
userRouter.post(
  '/me/avatar',
  authMiddleware,
  uploadAvatar.single('avatar'),
  uploadAvatarController
);

export default userRouter;

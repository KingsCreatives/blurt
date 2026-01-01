import { Router } from 'express';
import { createUserController } from '../controllers/user.controller';
import { validateData } from '../middleware/validationMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserSchema } from '../schemas/user.schemas';
import { follow, unfollow } from '../controllers/follow.controller';

const userRouter = Router();

userRouter.post('/', validateData(UserSchema), createUserController);
userRouter.post('/:id/follow', authMiddleware, follow);
userRouter.delete('/:id/unfollow', authMiddleware, unfollow);

export default userRouter;

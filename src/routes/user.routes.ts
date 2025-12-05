import { Router } from 'express';
import { createUserController } from '../controllers/user.controller';
import { validateData } from '../middleware/validationMiddleware';
import { UserSchema } from '../schemas/user.schemas';

const userRouter = Router();

userRouter.post('/', validateData(UserSchema), createUserController);

export default userRouter;

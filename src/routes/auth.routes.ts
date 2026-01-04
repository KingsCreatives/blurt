import { Router } from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/me', authMiddleware, getMe);

export default authRouter;

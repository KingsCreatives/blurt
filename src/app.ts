import express, { Request, Response, NextFunction } from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/user', userRouter);
app.use('/auth', authRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

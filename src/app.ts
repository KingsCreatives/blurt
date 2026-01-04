import express, { Request, Response, NextFunction } from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import tweetRouter from './routes/tweet.routes';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use('/uploads', express.static('src/uploads'));


app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/tweets', tweetRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
});

export default app;

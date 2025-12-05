import express, { Request, Response, NextFunction } from 'express';
import { loggerMiddleware, authMiddleware, validateData } from './middleware';
import { UserSchema } from './schemas/user.schemas';

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.post('/user', validateData(UserSchema), (req: Request, res: Response) => {
  const userData = req.body;

  console.log('Received:', userData);

  res.status(201).json({
    message: 'User created successfully',
    data: userData,
  });
});

app.get('/secret', authMiddleware, (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'You have successfully being authenticated' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Something broke!', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.user = decoded; // Now TypeScript knows 'user' can exist on 'req'
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid token' });
  }
};

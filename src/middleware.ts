import express, {Request, Response, NextFunction} from 'express'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization !== 'secret-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

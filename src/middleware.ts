import express, {Request, Response, NextFunction} from 'express'
import { ZodType, ZodError } from 'zod';

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


export const validateData = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          message: issue.message,
          field: issue.path.join('.'),
        }));

        return res.status(400).json({
          status: 'Bad Request',
          errors: errorMessages,
        });
      }
      next(error);
    }
  };
};
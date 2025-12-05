import express, { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateData = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
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

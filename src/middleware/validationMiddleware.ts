import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

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

        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: errorMessages,
        });
      }
      next(error);
    }
  };
};

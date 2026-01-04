import { Request, Response } from 'express';
import { LoginSchema } from '../schemas/auth.schema';
import { loginUser } from '../services/auth/auth.service';
import { StatusCodes } from 'http-status-codes';

export const login = async (req: Request, res: Response) => {
  try {
    const validation = LoginSchema.safeParse(req.body);

    if (!validation.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: validation.error.format });
    }

    const result = await loginUser(validation.data);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error: any) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  return res.json(req.user);
};

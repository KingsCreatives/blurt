import { Request, Response } from 'express';
import { createUser } from '../services/user/user.service';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema';
import { loginUser } from '../services/auth/auth.service';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../middleware/authMiddleware';

export const register = async (req: Request, res: Response) => {
  try {
    const validation = RegisterSchema.safeParse(req.body);

    if (!validation.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: validation.error.format });
    }

    const newUser = await createUser(validation.data);

    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

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

export const getMe = async (req: AuthRequest, res: Response) => {
  return res.json(req.user);
};

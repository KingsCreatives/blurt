import { Request, Response, NextFunction } from 'express';
import { LoginSchema } from '../schemas/auth.schema';
import {
  loginUser,
  registerUser,
  UserAlreadyExistsError,
} from '../services/auth/auth.service';
import { StatusCodes } from 'http-status-codes';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const newUser = await registerUser(userData);
    res.status(StatusCodes.CREATED).json({
      message: 'User created succesffuly',
      data: newUser,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(StatusCodes.CONFLICT).json({ error: error.message });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong' });
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


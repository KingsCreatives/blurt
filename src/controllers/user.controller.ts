import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user/user.service';
import { StatusCodes } from 'http-status-codes';
import { updateUserAvatar } from '../services/user/user.service';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const newUser = await UserService.createUser(userData);
    res.status(StatusCodes.CREATED).json({
      message: 'User created succesffuly',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatarController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!req.user?.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'User not authenticated' });
  }

  const avatarPath = `/uploads/avatars/${req.file.filename}`;

  const user = await updateUserAvatar(req.user!.id, avatarPath);

  res.json(user);
};

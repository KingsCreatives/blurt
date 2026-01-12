import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateUserAvatar } from '../services/user/user.service';

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

export const getMe = async (req: Request, res: Response) => {
  return res.json(req.user);
};

import { Request, Response } from 'express';
import { createUser } from '../services/user/user.service';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema';
import { loginUser } from '../services/auth/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const validation = RegisterSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format });
    }

    const newUser = await createUser(validation.data);

    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validation = LoginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format });
    }

    const result = await loginUser(validation.data);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};

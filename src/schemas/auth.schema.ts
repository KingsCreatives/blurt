import z, { email } from 'zod';

export const RegisterSchema = z.object({
  email: z.email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

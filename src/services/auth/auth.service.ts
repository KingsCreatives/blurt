import { prisma } from '../../lib/prisma';
import { generateToken } from '../../utils/jwt';
import { comparePassword } from '../../utils/password';

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValidPassword = await comparePassword(data.password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: token,
  };
};

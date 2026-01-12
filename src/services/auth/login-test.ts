import { loginUser, registerUser } from '../auth/auth.service';
import { prisma } from '../../lib/prisma';

async function main() {
  console.log('🔑 Testing Login Flow...');

  const email = 'jwt_test@example.com';
  const password = 'password123';

  await prisma.user.deleteMany({ where: { email } });
  await registerUser({
    email: email,
    username: 'jwt_tester',
    password: password,
  });
  console.log('✅ User created.');

  console.log('⏳ Attempting to log in...');
  try {
    const result = await loginUser({ email, password });

    console.log('\n🎉 LOGIN SUCCESS!');
    console.log(`👤 User: ${result.user.username}`);
    console.log(`🎟️ Token: ${result.token.substring(0, 20)}... (truncated)`);

    if (result.token.startsWith('eyJ')) {
      console.log('✅ Token format looks valid.');
    }
  } catch (error) {
    console.error('❌ Login Failed:', error);
  }
}

main().finally(() => prisma.$disconnect());

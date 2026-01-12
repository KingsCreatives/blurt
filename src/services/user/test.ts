import { prisma } from '../../lib/prisma';
import { comparePassword } from '../../utils/password';
import { registerUser } from '../auth/auth.service';

async function main() {
  console.log('🔐 Testing Auth Security...');

  const email = 'dave@secure.com';
  const rawPassword = 'super_secret_password';

  await prisma.user.deleteMany({ where: { email } });

  console.log(`1. Creating user Dave with password: "${rawPassword}"`);
  const dave = await registerUser({
    email: email,
    username: 'dave_secure',
    password: rawPassword,
  });

  console.log(`2. User Created! ID: ${dave.id}`);
  console.log(`3. Stored Password in DB: ${dave.password}`);

  if (dave.password === rawPassword) {
    console.error('❌ FAIL: Password was stored in plain text!');
  } else if (dave.password.startsWith('$2')) {
    console.log('✅ PASS: Password is hashed correctly.');
  }

  console.log('\n4. Testing Login Logic...');
  const isMatch = await comparePassword(rawPassword, dave.password);

  if (isMatch) {
    console.log("✅ PASS: 'super_secret_password' matches the hash.");
  } else {
    console.error('❌ FAIL: Password comparison failed.');
  }
}

main().finally(() => prisma.$disconnect());

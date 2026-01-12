import { prisma } from '../../lib/prisma';
import { followUser, unfollowerUser } from './follow.service';
import { registerUser } from '../auth/auth.service';

async function main() {
  console.log('🤝 Testing Social Graph...');

  const daveEmail = 'dave_social@test.com';
  const aliceEmail = 'alice_social@test.com';

  await prisma.user.deleteMany({
    where: { email: { in: [daveEmail, aliceEmail] } },
  });

  const dave = await registerUser({
    email: daveEmail,
    username: 'dave_social',
    password: 'pass123',
  });

  const alice = await registerUser({
    email: aliceEmail,
    username: 'alice_social',
    password: 'pass123',
  });

  console.log(`✅ Users created: Dave (${dave.id}) & Alice (${alice.id})`);

  console.log('\n1️⃣ Dave attempts to follow Alice...');
  await followUser(dave.id, alice.id);
  console.log('✅ Followed successfully.');

  console.log('\n2️⃣ Dave attempts to follow Alice AGAIN...');
  try {
    await followUser(dave.id, alice.id);
  } catch (e: any) {
    console.log(`✅ Correctly failed: "${e.message}"`);
  }

  console.log('\n3️⃣ Dave unfollows Alice...');
  await unfollowerUser(dave.id, alice.id);
  console.log('✅ Unfollowed successfully.');

  console.log('\n4️⃣ Dave unfollows Alice AGAIN...');
  try {
    await unfollowerUser(dave.id, alice.id);
  } catch (e: any) {
    console.log(`✅ Correctly failed: "${e.message}"`);
  }
}

main().finally(() => prisma.$disconnect());

import { prisma } from '../src/lib/prisma'; 

async function main() {
  console.log('🌱 Starting Bulk Seeding...');

  await prisma.like.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.tweet.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      email: 'alice@twitter.com',
      username: 'alice_w',
      password: 'password123',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      email: 'charlie@twitter.com',
      username: 'charlie_fan',
      password: 'password123',
    },
  });

  console.log('✅ Users created.');

  await prisma.follows.create({
    data: { followerId: charlie.id, followingId: alice.id },
  });

  console.log('✅ Charlie is following Alice.');

  console.log('⏳ Generating 25 tweets...');

  const tweetsToCreate = [];
  for (let i = 0; i < 25; i++) {
    tweetsToCreate.push({
      content: `Tweet number ${i + 1} from Alice! 🐦`,
      authorId: alice.id,
      createdAt: new Date(Date.now() - i * 60 * 1000),
    });
  }

  await prisma.tweet.createMany({
    data: tweetsToCreate,
  });

  console.log('✅ 25 Tweets created.');
  console.log('🏁 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

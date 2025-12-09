import {prisma} from '../src/lib/prisma'

async function main() {
  console.log('🌱 Starting seeding...');

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

  const bob = await prisma.user.create({
    data: {
      email: 'bob@twitter.com',
      username: 'bob_the_builder',
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

  console.log('✅ Users created: Alice, Bob, Charlie');
   
  const tweet1 = await prisma.tweet.create({
    data: {
      content: 'Hello Twitter! This is Alice.',
      authorId: alice.id,
      createdAt: new Date('2023-01-01'), 
    },
  });

  const tweet2 = await prisma.tweet.create({
    data: {
      content: 'Just finished a project. #coding',
      authorId: alice.id,
      createdAt: new Date(), 
    },
  });

  const tweet3 = await prisma.tweet.create({
    data: {
      content: 'Can we fix it? Yes we can!',
      authorId: bob.id,
    },
  });

  console.log('✅ Tweets created');
  
  await prisma.follows.create({
    data: {
      followerId: charlie.id,
      followingId: alice.id,
    },
  });

  await prisma.follows.create({
    data: {
      followerId: charlie.id,
      followingId: bob.id,
    },
  });

  await prisma.follows.create({
    data: {
      followerId: bob.id,
      followingId: alice.id,
    },
  });

  console.log('✅ Follow relationships established');
  
  await prisma.like.create({
    data: {
      userId: charlie.id,
      tweetId: tweet1.id,
    },
  });

  console.log('✅ Likes added');
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
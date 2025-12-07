import {prisma} from '../src/lib/prisma'

async function main() {
  console.log('Start seeding ...');

  const user1 = await prisma.user.upsert({
    where: { email: 'test@blurt.com' },
    update: {},
    create: {
      email: 'test@blurt.com',
      username: 'Alice Blurt',
      password: 'password123',
    },
  });

  console.log({ user1 });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

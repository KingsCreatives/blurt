import { prisma } from '../lib/prisma'; 
import { getFeed } from './tweet.service';

async function main() {
  try {
    console.log('Looking for Charlie...');
    const charlie = await prisma.user.findUnique({
      where: { username: 'charlie_fan' }
    });

    if (!charlie) {
      console.error("Charlie not found! Did you run 'npx prisma db seed'?");
      return;
    }

    console.log(`Found Charlie! ID: ${charlie.id}`);
    console.log('Fetching feed...');

    const feed = await getFeed(charlie.id);

    console.log(`Feed received: ${feed.length} tweets`);
    console.log(JSON.stringify(feed, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

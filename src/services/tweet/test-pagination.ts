import { getFeed } from './tweet.service';
import { prisma } from '../../lib/prisma';

async function main() {
  console.log('\n📜 Testing Infinite Scroll (Cursor Pagination)...\n');

  const charlie = await prisma.user.findUnique({
    where: { username: 'charlie_fan' },
  });

  if (!charlie) {
    console.error("❌ Run 'npx prisma db seed' first!");
    return;
  }

  console.log('1️⃣ Fetching Page 1 (Limit: 10)...');
  const page1 = await getFeed(charlie.id, 10, undefined); 

  console.log(`   ✅ Received: ${page1.tweets.length} tweets`);

  if (page1.tweets.length === 0) {
    console.log('❌ Error: No tweets found. Check seed.');
    return;
  }

  console.log(`   📝 First Tweet: "${page1.tweets[0].content}"`);
  console.log(
    `   📝 Last Tweet:  "${page1.tweets[page1.tweets.length - 1].content}"`
  );
  console.log(`   🔗 Next Cursor: ${page1.nextCursor}`);

  if (!page1.nextCursor) {
    console.log('❌ Error: Expected a cursor, got null.');
    return;
  }

  console.log('\n2️⃣ Fetching Page 2 (Limit: 10) using Cursor...');
  const page2 = await getFeed(charlie.id, 10, page1.nextCursor);

  console.log(`   ✅ Received: ${page2.tweets.length} tweets`);
  console.log(`   📝 First Tweet: "${page2.tweets[0].content}"`);

  if (page1.tweets[9].id === page2.tweets[0].id) {
    console.error(
      '❌ FAIL: Page 2 started with the same tweet as Page 1 end. (Skip logic failed)'
    );
  } else {
    console.log('✅ PASS: Page 2 correctly skipped the cursor tweet.');
  }

  console.log('\n3️⃣ Fetching Page 3 (Remaining 5 items)...');
  
  if (page2.nextCursor) {
    const page3 = await getFeed(charlie.id, 10, page2.nextCursor);
    console.log(`   ✅ Received: ${page3.tweets.length} tweets`);
    console.log(`   🔗 Next Cursor: ${page3.nextCursor} (Should be null)`);

    if (page3.nextCursor === null) {
      console.log(
        '✅ PASS: Pagination correctly detected the end of the list.'
      );
    } else {
      console.error('❌ FAIL: Expected null cursor at end.');
    }
  }
}

main().finally(() => prisma.$disconnect());

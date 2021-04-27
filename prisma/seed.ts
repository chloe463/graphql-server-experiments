import { PrismaClient } from "@prisma/client";
import faker from "faker";
const prisma = new PrismaClient();

async function main() {
  const posts = Array.from({ length: 100 }, (_, i) => i).map((i: number) => {
    return {
      title: faker.lorem.word(10),
      body: faker.lorem.words(100),
      userId: Math.ceil(i / 10),
    };
  });
  for (const post of posts) {
    const res = await prisma.post.create({
      data: post,
    });
  }
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

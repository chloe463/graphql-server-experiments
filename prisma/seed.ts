import { PrismaClient } from "@prisma/client";
import faker from "faker";
const prisma = new PrismaClient();

const createPosts = async () =>{
  const posts = Array.from({ length: 100 }, (_, i) => i + 1).map((i: number) => {
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

const createQuestionnares = async () => {
  const options = Array.from({ length: 4 }, (_, i) => i + 1).map((i: number) => {
    return {
      text: faker.lorem.word(8),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  const questions = Array.from({ length: 4 }, (_, i) => i + 1).map((i: number) => {
    return {
      text: faker.lorem.word(8),
      type: i % 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      options: {
        create: options,
      },
    };
  });

  const questionnaires = Array.from({ length: 10 }, (_, i) => i + 1).map((i: number) => {
    const startAt = new Date();
    const endAt = new Date(startAt.getFullYear(), startAt.getMonth() + 2, startAt.getDate());
    return {
      title: `Questionnaire.${i}`,
      description: faker.lorem.words(30),
      state: i % 4,
      startAt,
      endAt,
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: {
        create: questions,
      },
    };
  });
  for (const questionnaire of questionnaires) {
    await prisma.questionnaire.create({
      data: questionnaire,
    });
  }
};

async function main() {
  await createPosts();
  await createQuestionnares();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

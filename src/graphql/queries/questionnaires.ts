import { intArg, list, queryField } from "nexus";

export const questionnaires = queryField("questionnaires", {
  type: list("Questionnaire"),
  args: {
    page: intArg({ default: 1 }),
  },
  resolve: async(_root, args, context) => {
    const { prismaClient } = context;
    const { page } = args;
    const questionnaires = await prismaClient.questionnaire.findMany({
      where: {
        deleted: {
          equals: false,
        },
      },
      include: { questions: true,  },
      skip: (page - 1) * 10,
      take: 10,
    });
    return questionnaires;
  },
});

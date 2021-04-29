import { list, queryField } from "nexus";

export const questionnaires = queryField("questionnaires", {
  type: list("Questionnaire"),
  resolve: async(_root, args, context) => {
    const { prismaClient } = context;
    const questionnaires = await prismaClient.questionnaire.findMany({
      include: { questions: true,  },
    });
    return questionnaires;
  },
});

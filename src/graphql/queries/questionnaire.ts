import { intArg, queryField } from "nexus";

export const questionnaire = queryField("questionnaire", {
  type: "Questionnaire",
  args: {
    id: intArg(),
  },
  resolve: async(_root, args, context) => {
    const { id } = args;
    const { prismaClient } = context;
    const questionnaire = await prismaClient.questionnaire.findUnique({
      where: { id },
      include: { questions: true },
    });
    return questionnaire;
  },
});

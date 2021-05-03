import { intArg, mutationField, nonNull } from "nexus";
import { DeleteQuestionnairePayload } from "../types";

export const deleteQuestionnaire = mutationField("deleteQuestionnaire", {
  type: DeleteQuestionnairePayload,
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_root, args, { prismaClient }) => {
    try {
      const res = await prismaClient.questionnaire.update({
        where: { id: args.id },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      return { result: true };
    } catch (e) {
      console.error(e);
      return { result: false };
    }
  },
});

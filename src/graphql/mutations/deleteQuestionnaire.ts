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

      return { id: args.id, result: true };
    } catch (e) {
      console.error(e);
      return { id: args.id, result: false };
    }
  },
});

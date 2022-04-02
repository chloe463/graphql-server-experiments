import { intArg, mutationField, nonNull } from "nexus";
import { CancelToDeleteQuestionnairePayload, DeleteQuestionnairePayload } from "../types";

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

export const cancelToDeleteQuestionnaire = mutationField("cancelToDeleteQuestionnaire", {
  type: CancelToDeleteQuestionnairePayload,
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_root, args, { prismaClient }) => {
    const res = await prismaClient.questionnaire.update({
      where: { id: args.id },
      data: {
        deleted: false,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        state: true,
        startAt: true,
        endAt: true,
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
            required: true,
            options: {
              select: {
                id: true,
                text: true,
              }
            }
          }
        }
      }
    });
    return {
      questionnaire: res,
    };
  },
});

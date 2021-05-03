import { arg, mutationField } from "nexus";
import { createQuestionnaireInput } from "../inputs";
import { createQuestionnairePayload } from "../types";

export const createQuestionnaire = mutationField("createQuestionnaire", {
  type: createQuestionnairePayload,
  args: {
    questionnaire: arg({
      type: createQuestionnaireInput,
    }),
  },
  resolve: async (_root, args, context) => {
    const { prismaClient } = context;

    const questionnaire = {
      ...args.questionnaire,
      questions: {
        create:args.questionnaire.questions.map((question) => {
          return {
            ...question,
            options: {
              create: question.options,
            },
          }
        }),
      },
    };

    const res = await prismaClient.questionnaire.create({
      data: questionnaire,
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

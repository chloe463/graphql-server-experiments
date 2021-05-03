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
    const questionnaire = args.questionnaire;

    const questions = questionnaire.questions.map((v) => {
      return {
        ...v,
        options: {
          create: v.options,
        },
      }
    });

    const res = await prismaClient.questionnaire.create({
      data: {
        ...questionnaire,
        questions: {
          create: questions,
        }
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
      ...res,
    };
  },
});

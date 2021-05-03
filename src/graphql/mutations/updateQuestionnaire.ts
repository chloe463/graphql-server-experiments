import { Prisma } from "@prisma/client";
import { arg, mutationField, nonNull } from "nexus";
import { updateQuestionnaireInput } from "../inputs";
import { updateQuestionnairePayload } from "../types";

type UpdateParam = Prisma.QuestionnaireUpdateArgs["data"];
type UpdateQuestionsParams = UpdateParam["questions"];
type QuestionUpdateWithWhereUniqueWithoutQuestionnaireInput = Prisma.QuestionUpdateWithWhereUniqueWithoutQuestionnaireInput;
type QuestionCreateWithoutQuestionnaireInput = Prisma.QuestionCreateWithoutQuestionnaireInput;

export const upateQuestionnaire = mutationField("UpdateQuestionnaire", {
  type: updateQuestionnairePayload,
  args: {
    questionnaire: nonNull(arg({
      type: updateQuestionnaireInput,
    })),
  },
  resolve: async (_root, args, context) => {
    const { prismaClient } = context;

    const current = await prismaClient.questionnaire.findUnique({
      where: {
        id: args.questionnaire.id,
      },
      select: {
        id: false,
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


    const questions: UpdateQuestionsParams = {
      create: [],
      update: [],
    };
    for (const question of args.questionnaire.questions) {
      const existingOptions = [];
      const newOptions = [];
      for (const option of question.options) {
        if (option.id != null) {
          existingOptions.push({
            where: {
              id: option.id,
            },
            data: {
              text: option.text,
            },
          });
          continue;
        }
        newOptions.push({
          text: option.text,
        });
      }
      if (question.id != null) {
        (questions.update as Array<QuestionUpdateWithWhereUniqueWithoutQuestionnaireInput>).push({
          where: { id: question.id },
          data: {
            ...question,
            options: {
              update: existingOptions,
              create: newOptions,
            }
          },
        });
        continue;
      }
      // TODO: Fix type error
      // @ts-ignore
      (questions.create).push({
        ...question,
        options: {
          create: newOptions,
        }
      });
    }

    const questionnaire: UpdateParam = {
      title: args.questionnaire.title || current.title,
      description: args.questionnaire.description || current.description,
      state: args.questionnaire.state || current.state,
      startAt: args.questionnaire.startAt || current.startAt,
      endAt: args.questionnaire.endAt || current.endAt,
      questions,
    };

    const res = await prismaClient.questionnaire.update({
      where: {
        id: args.questionnaire.id,
      },
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
  }
});

import { Prisma } from "@prisma/client";
import { arg, mutationField, nonNull } from "nexus";
import { NexusGenInputs } from "../generated/typings";
import { updateQuestionnaireInput } from "../inputs";
import { updateQuestionnairePayload } from "../types";

type UpdateQuestionnaireParam = Prisma.QuestionnaireUpdateArgs["data"];
type CreateQuestionInput = Required<Omit<NexusGenInputs["UpdateQuestionInput"], "id">>;
type CreateOptionInput = Required<Omit<NexusGenInputs["UpdateOptionInput"], "id">>;

const validateCreateQuestion = (question: NexusGenInputs["UpdateQuestionInput"]): question is CreateQuestionInput => {
  if (!question.id) {
    return Boolean(question.type && question.text && question.required);
  }
  return false;
};

const validateCreateOption = (option: NexusGenInputs["UpdateOptionInput"]): option is CreateOptionInput => {
  if (!option.id) {
    return Boolean(option.text);
  }
  return false;
};

const buildUpdateParams = (questionnaire: NexusGenInputs["UpdateQuestionnaireInput"]): UpdateQuestionnaireParam => {
  return {
    ...questionnaire,
    questions: {
      update: questionnaire.questions.filter((q) => q.id).map((q) => {
        return {
          where: { id: q.id },
          data: {
            ...q,
            options: {
              update: q.options.filter((o) => o.id).map((o) => {
                return {
                  where: { id: o.id },
                  data: o,
                };
              }),
              create: q.options.filter(validateCreateOption).map((o) => {
                return o;
              }),
            }
          }
        };
      }),
      create: questionnaire.questions.filter(validateCreateQuestion).map((q) => {
        return q;
      })
    }
  };
}

export const upateQuestionnaire = mutationField("UpdateQuestionnaire", {
  type: updateQuestionnairePayload,
  args: {
    questionnaire: nonNull(arg({
      type: updateQuestionnaireInput,
    })),
  },
  resolve: async (_root, args, context) => {
    const { prismaClient } = context;

    const res = await prismaClient.questionnaire.update({
      where: {
        id: args.questionnaire.id,
      },
      data: buildUpdateParams(args.questionnaire),
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

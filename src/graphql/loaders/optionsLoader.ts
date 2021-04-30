import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const optionsLoaderFactory = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: number[]) => {
    const res = await prisma.option.findMany({
      where: {
        questionId: {
          in: ids,
        },
      },
    });

    const optionsByQuestionId = new Map();
    res.forEach((option) => {
      const questionId = option.questionId;
      if (optionsByQuestionId.has(questionId)) {
        const current = optionsByQuestionId.get(questionId);
        optionsByQuestionId.set(questionId, [...current, option]);
        return;
      }
      optionsByQuestionId.set(questionId, [option]);
    });

    return [...optionsByQuestionId.values()];
  });
};

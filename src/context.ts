import { PrismaClient } from "@prisma/client";
import { ApolloServerExpressConfig } from "apollo-server-express";
import DataLoader from "dataloader";
import { JsonPlaceholderClient } from "./api/JsonPlaceholderClient";

export type Context = {
  jsonPlaceholderClient: JsonPlaceholderClient,
  prismaClient: PrismaClient,
  optionsLoader: ReturnType<typeof optionsLoader>,
};

const optionsLoader = (prisma: PrismaClient) => {
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
    const options = [...optionsByQuestionId.values()];
    return options;
  });
};

export const createContext: ApolloServerExpressConfig["context"] = () => {
  const prismaClient = new PrismaClient({
    log: [
      {
          level: 'query',
          emit: 'event',
      },
    ]
  });
  prismaClient.$on("query", console.log);
  return {
    jsonPlaceholderClient: new JsonPlaceholderClient(),
    prismaClient,
    optionsLoader: optionsLoader(prismaClient),
  };
};

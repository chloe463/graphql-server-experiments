import { PrismaClient } from "@prisma/client";
import { ApolloServerExpressConfig } from "apollo-server-express";
import { JsonPlaceholderClient } from "./api/JsonPlaceholderClient";
import { optionsLoaderFactory } from "./graphql/loaders";

export type Context = {
  jsonPlaceholderClient: JsonPlaceholderClient,
  prismaClient: PrismaClient,
  optionsLoader: ReturnType<typeof optionsLoaderFactory>,
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
    optionsLoader: optionsLoaderFactory(prismaClient),
  };
};

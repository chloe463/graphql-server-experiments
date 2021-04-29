import { PrismaClient } from "@prisma/client";
import { ApolloServerExpressConfig } from "apollo-server-express";
import { JsonPlaceholderClient } from "./api/JsonPlaceholderClient";

export type Context = {
  jsonPlaceholderClient: JsonPlaceholderClient,
  prismaClient: PrismaClient,
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
  };
};

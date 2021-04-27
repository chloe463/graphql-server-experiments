import { PrismaClient } from "@prisma/client";
import { ApolloServerExpressConfig } from "apollo-server-express";
import { JsonPlaceholderClient } from "./api/JsonPlaceholderClient";

export type Context = {
  jsonPlaceholderClient: JsonPlaceholderClient,
  prismaClient: PrismaClient,
};

export const createContext: ApolloServerExpressConfig["context"] = () => {
  return {
    jsonPlaceholderClient: new JsonPlaceholderClient(),
    prismaClient: new PrismaClient(),
  };
};

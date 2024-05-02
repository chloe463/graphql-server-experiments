import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import { JsonPlaceholderClient } from "./api/JsonPlaceholderClient.js";
import { optionsLoaderFactory } from "./graphql/loaders/index.js";

export type Context = {
  jsonPlaceholderClient: JsonPlaceholderClient,
  prismaClient: PrismaClient,
  optionsLoader: ReturnType<typeof optionsLoaderFactory>,
};

export const createContext: ExpressMiddlewareOptions<Context>["context"] = async () => {
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

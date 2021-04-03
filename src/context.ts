import { ApolloServerExpressConfig } from "apollo-server-express";
import { JsonPlaceholderClient } from "./api/JsonPlaceholderClient";

export type Context = {
  jsonPlaceholderClient: JsonPlaceholderClient,
};

export const createContext: ApolloServerExpressConfig["context"] = () => {
  return {
    jsonPlaceholderClient: new JsonPlaceholderClient(),
  };
};

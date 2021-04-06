import { ApolloServer } from "apollo-server";
import { Context } from "./context";
import { schema } from "./graphql/schema";

type DummyContext = {
  [key in keyof Context]: jest.Mock;
};

export const constructTestServer = (context: DummyContext) => {
  const server = new ApolloServer({
    schema,
    context,
  });

  return server;
};

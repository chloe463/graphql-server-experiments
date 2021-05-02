import { ApolloServer } from "apollo-server";
import { Context } from "./context";
// import typeDefs from "./graphql/generated/schema.graphql";
import { schema } from "./graphql/schema";

type DummyContext = {
  [key in keyof Partial<Context>]: jest.Mock;
};

export const constructTestServer = (context: DummyContext) => {
  const server = new ApolloServer({
    schema,
    // typeDefs,
    context,
  });

  return server;
};

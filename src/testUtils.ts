import { ApolloServer } from "@apollo/server";
// import typeDefs from "./graphql/generated/schema.graphql";
import { schema } from "./graphql/schema";

export const constructTestServer = () => {
  const server = new ApolloServer({
    schema,
  });

  return server;
};

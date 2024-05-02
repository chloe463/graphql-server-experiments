import { ApolloServer } from "@apollo/server";
// import typeDefs from "./graphql/generated/schema.graphql.js";
import { schema } from "./graphql/schema.js";

export const constructTestServer = () => {
  const server = new ApolloServer({
    schema,
  });

  return server;
};

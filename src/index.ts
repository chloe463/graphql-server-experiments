import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createContext } from "./context";
import { schema } from "./graphql/schema";


const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const app = express();
apolloServer.applyMiddleware({ app });

app.get("/ping", function (_, res) {
  res.send("pong");
})

app.listen(3000);

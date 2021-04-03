import { ApolloServer } from "apollo-server-express";
import express from "express";
import { schema } from "./graphql/schema";


const apolloServer = new ApolloServer({
  schema,
});

const app = express();
apolloServer.applyMiddleware({ app });

app.get("/ping", function (_, res) {
  res.send("pong");
})

app.listen(3000);

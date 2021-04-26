import { ApolloServer } from "apollo-server-express";
import express from "express";
import morgan from "morgan";
import { createContext } from "./context";
import { schema } from "./graphql/schema";

const HOST = process.env.HOST || "localhost";
const PORT = parseInt(process.env.PORT, 10) || 4000;

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const app = express();
app.use(morgan("combined"));
apolloServer.applyMiddleware({ app });

app.get("/ping", function (_, res) {
  res.send("pong");
})

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});

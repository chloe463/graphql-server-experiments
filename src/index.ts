import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createContext } from "./context.js";
import { schema } from "./graphql/schema.js";
import todos from "./todos.js";

const HOST = process.env.HOST || "localhost";
const PORT = parseInt(process.env.PORT, 10) || 4000;

const apolloServer = new ApolloServer({ schema });

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", function (_, res) {
  res.send("pong");
});

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
};
app.use("/todos", cors(corsOptions), todos);

apolloServer.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(apolloServer, {
      context: createContext,
    }),
  );
});

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});

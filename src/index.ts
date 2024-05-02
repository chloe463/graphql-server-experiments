import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createContext } from "./context";
import { schema } from "./graphql/schema";
import todos from "./todos";

const HOST = process.env.HOST || "localhost";
const PORT = parseInt(process.env.PORT, 10) || 4000;

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });
});

app.get("/ping", function (_, res) {
  res.send("pong");
});

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
};
app.use("/todos", cors(corsOptions), todos);

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});

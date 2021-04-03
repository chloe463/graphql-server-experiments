import { makeSchema } from "nexus";
import path from "path";
import * as queries from "./queries";
import * as types from "./types";

export const schema = makeSchema({
  types: [...Object.values(types), ...Object.values(queries)],
  outputs: {
    typegen: path.join(__dirname, "/generated/typings.ts"),
    schema: path.join(__dirname, "/generated/schema.graphql"),
  },
  contextType: {
    module: path.join(__dirname, "/../context.ts"),
    export: "Context",
  },
});

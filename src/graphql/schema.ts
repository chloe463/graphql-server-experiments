import { connectionPlugin, makeSchema } from "nexus";
import * as path from "path";
import * as inputs from "./inputs/index.js";
import * as mutations from "./mutations/index.js";
import * as queries from "./queries/index.js";
import * as types from "./types/index.js";

export const schema = makeSchema({
  types: [
    ...Object.values(types),
    ...Object.values(queries),
    ...Object.values(inputs),
    ...Object.values(mutations),
  ],
  outputs: {
    typegen: path.join(import.meta.dirname, "/generated/typings.ts"),
    schema: path.join(import.meta.dirname, "/generated/schema.graphql"),
  },
  contextType: {
    module: path.join(import.meta.dirname, "/../context.ts"),
    export: "Context",
  },
  plugins: [connectionPlugin()],
});


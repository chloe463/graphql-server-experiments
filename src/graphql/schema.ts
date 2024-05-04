import { connectionPlugin, makeSchema } from "nexus";
import * as path from "path";
import * as inputs from "./inputs";
import * as mutations from "./mutations";
import * as queries from "./queries";
import * as types from "./types";

type ContextType = Parameters<typeof makeSchema>[0]["contextType"];

const contextType: ContextType | undefined = ["development", "test"].includes(process.env.NODE_ENV) ? {
  module: path.join(__dirname, "/../context.ts"),
  export: "Context",
} : undefined;

export const schema = makeSchema({
  types: [
    ...Object.values(types),
    ...Object.values(queries),
    ...Object.values(inputs),
    ...Object.values(mutations),
  ],
  outputs: {
    typegen: path.join(__dirname, "/generated/typings.ts"),
    schema: path.join(__dirname, "/generated/schema.graphql"),
  },
  contextType,
  plugins: [connectionPlugin()],
});


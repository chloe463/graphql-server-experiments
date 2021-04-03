import { makeSchema } from "nexus";
import path from "path";
import * as types from "./types";


export const schema = makeSchema({
  types: [...Object.keys(types)],
  outputs: {
    typegen: path.join(__dirname, "/generated/typings.ts"),
    schema: path.join(__dirname, "/generated/schema.graphql"),
  },
});

import { Kind } from "graphql";
import { scalarType } from "nexus";

export const TodoIdScalar = scalarType({
  name: "TodoId",
  asNexusMethod: "todoId",
  description: "Todo id",
  sourceType: "number",
  parseValue(value) {
    return Number(value);
  },
  serialize(value) {
    return Number(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Number(ast.value);
    }
    return null;
  },
});
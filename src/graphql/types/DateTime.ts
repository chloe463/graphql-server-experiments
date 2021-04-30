import { Kind } from "graphql";
import { scalarType } from "nexus";

export const DateTimeScalar = scalarType({
  name: "DateTime",
  asNexusMethod: 'datetime',
  parseValue: (value) => {
    return new Date(value);
  },
  serialize: (value: Date) => {
    return value.toISOString();
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null;
  },
});

export const DateScalar = scalarType({
  name: "Date",
  asNexusMethod: 'date',
  parseValue: (value) => {
    return new Date(value);
  },
  serialize: (value: Date) => {
    return value.toISOString().slice(0, 10);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null;
  },
});

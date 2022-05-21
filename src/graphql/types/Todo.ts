import { objectType } from "nexus";

export const Todo = objectType({
  name: "Todo",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("task");
    t.datetime("finishedAt");
    t.nonNull.datetime("createdAt");
    t.nonNull.datetime("updatedAt");
  },
});

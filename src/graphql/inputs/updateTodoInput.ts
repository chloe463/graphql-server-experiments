import { inputObjectType } from "nexus";

export const UpdateTodoInput = inputObjectType({
  name: "UpdateTodoInput",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("task");
    t.datetime("finishedAt");
  },
});

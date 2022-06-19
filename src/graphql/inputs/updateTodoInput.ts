import { inputObjectType } from "nexus";

export const UpdateTodoInput = inputObjectType({
  name: "UpdateTodoInput",
  definition(t) {
    t.nonNull.todoId("id");
    t.string("task");
    t.datetime("finishedAt");
  },
});

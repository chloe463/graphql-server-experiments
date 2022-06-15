import { objectType } from "nexus";

export const DeleteTodoPayload = objectType({
  name: "DeleteTodoPayload",
  definition(t) {
    t.todoId("id");
    t.boolean("result");
  },
});

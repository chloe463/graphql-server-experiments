import { objectType } from "nexus";
import { Todo } from "./Todo.js";

export const UpdateTodoPayload = objectType({
  name: "UpdateTodoPayload",
  definition(t) {
    t.field("todo", {
      type: Todo,
    });
  },
});

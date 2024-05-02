import { objectType } from "nexus";
import { Todo } from "./Todo.js";

export const CreateTodoPayload = objectType({
  name: "CreateTodoPayload",
  definition(t) {
    t.field("todo", {
      type: Todo,
    });
  },
});

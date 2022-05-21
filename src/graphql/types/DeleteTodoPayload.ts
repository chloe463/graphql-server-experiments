import { objectType } from "nexus";

export const DeleteTodoPayload = objectType({
  name: "DeleteTodoPayload",
  definition(t) {
    t.int("id");
    t.boolean("result");
  },
});

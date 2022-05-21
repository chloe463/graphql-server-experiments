import { inputObjectType } from "nexus";

export const CreateTodoInput = inputObjectType({
  name: "CreateTodoInput",
  definition(t) {
    t.nonNull.string("task");
  },
});

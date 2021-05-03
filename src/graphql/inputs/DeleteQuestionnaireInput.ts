import { inputObjectType } from "nexus";

export const DeleteQuestionnaireInput = inputObjectType({
  name: "DeleteQuestionnaireInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

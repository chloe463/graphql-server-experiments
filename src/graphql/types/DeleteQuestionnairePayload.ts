import { objectType } from "nexus";

export const DeleteQuestionnairePayload = objectType({
  name: "DeleteQuestionnairePayload",
  definition(t) {
    t.int("id");
    t.boolean("result");
  },
});

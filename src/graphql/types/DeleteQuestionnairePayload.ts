import { objectType } from "nexus";

export const DeleteQuestionnairePayload = objectType({
  name: "DeleteQuestionnairePayload",
  definition(t) {
    t.boolean("result");
  },
});

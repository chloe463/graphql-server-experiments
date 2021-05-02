import { inputObjectType } from "nexus";

export const QuestionnaireConnectionInput = inputObjectType({
  name: "QuestionnaireConnectionInput",
  definition(t) {
    t.string("column");
    t.string("order");
  },
});

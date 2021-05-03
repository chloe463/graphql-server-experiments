import { objectType } from "nexus";
import { Questionnaire } from "./Questionnaire";

export const createQuestionnairePayload = objectType({
  name: "CreateQuestionnairePayload",
  definition(t) {
    t.field("questionnaire", {
      type: Questionnaire,
    })
  },
});

import { objectType } from "nexus";
import { Questionnaire } from "./Questionnaire";

export const updateQuestionnairePayload = objectType({
  name: "UpdateQuestionnairePayload",
  definition(t) {
    t.field("questionnaire", {
      type: Questionnaire,
    })
  },
});

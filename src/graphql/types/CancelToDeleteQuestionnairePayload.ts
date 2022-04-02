import { objectType } from "nexus";
import { Questionnaire } from "./Questionnaire";

export const CancelToDeleteQuestionnairePayload = objectType({
  name: "CancelToDeleteQuestionnairePayload",
  definition(t) {
    t.field("questionnaire", {
      type: Questionnaire,
    })
  },
});

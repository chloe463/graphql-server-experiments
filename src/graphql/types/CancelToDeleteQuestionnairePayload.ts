import { objectType } from "nexus";
import { Questionnaire } from "./Questionnaire.js";

export const CancelToDeleteQuestionnairePayload = objectType({
  name: "CancelToDeleteQuestionnairePayload",
  definition(t) {
    t.field("questionnaire", {
      type: Questionnaire,
    })
  },
});

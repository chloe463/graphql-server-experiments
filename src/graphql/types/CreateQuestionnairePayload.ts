import { objectType } from "nexus";
import { Questionnaire } from "./Questionnaire.js";

export const createQuestionnairePayload = objectType({
  name: "CreateQuestionnairePayload",
  definition(t) {
    t.field("questionnaire", {
      type: Questionnaire,
    })
  },
});

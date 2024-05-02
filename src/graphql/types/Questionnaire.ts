import { objectType } from "nexus";
import { Question } from "./Question.js";

export const Questionnaire = objectType({
  name: "Questionnaire",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("state");
    t.nonNull.datetime("startAt");
    t.nonNull.datetime("endAt");
    t.nonNull.list.field("questions", {
      type: Question,
    });
  }
});

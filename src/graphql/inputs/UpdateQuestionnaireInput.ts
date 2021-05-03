import { inputObjectType } from "nexus";

export const updateOptionInput = inputObjectType({
  name: "UpdateOptionInput",
  definition(t) {
    t.int("id");
    t.string("text");
  },
});

export const updateQuestionInput = inputObjectType({
  name: "UpdateQuestionInput",
  definition(t) {
    t.int("id");
    t.string("text");
    t.int("type");
    t.boolean("required");
    t.list.field("options", {
      type: updateOptionInput,
    });
  },
});

export const updateQuestionnaireInput = inputObjectType({
  name: "UpdateQuestionnaireInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.string("description");
    t.int("state");
    t.datetime("startAt");
    t.datetime("endAt");
    t.list.field("questions", {
      type: updateQuestionInput,
    });
  },
});

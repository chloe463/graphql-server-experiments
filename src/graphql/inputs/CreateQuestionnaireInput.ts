import { inputObjectType } from "nexus";

export const createOptionInput = inputObjectType({
  name: "CreateOptionInput",
  definition(t) {
    t.nonNull.string("text");
  },
});

export const createQuestionInput = inputObjectType({
  name: "CreateQuestionInput",
  definition(t) {
    t.nonNull.string("text");
    t.nonNull.int("type");
    t.nonNull.boolean("required");
    t.nonNull.list.field("options", {
      type: createOptionInput,
    });
  },
});

export const createQuestionnaireInput = inputObjectType({
  name: "CreateQuestionnaireInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("state");
    t.nonNull.datetime("startAt");
    t.nonNull.datetime("endAt");
    t.nonNull.list.field("questions", {
      type: createQuestionInput,
    });
  },
});

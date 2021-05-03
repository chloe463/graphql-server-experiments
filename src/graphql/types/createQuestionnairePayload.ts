import { objectType } from "nexus";

export const createOptionPayload = objectType({
  name: "CreateOptionPayload",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("text");
  },
});

export const createQuestionPayload = objectType({
  name: "CreateQuestionPayload",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("text");
    t.nonNull.int("type");
    t.nonNull.boolean("required");
    t.nonNull.list.field("options", {
      type: createOptionPayload,
    });
  },
});

export const createQuestionnairePayload = objectType({
  name: "CreateQuestionnairePayload",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("state");
    t.nonNull.datetime("startAt");
    t.nonNull.datetime("endAt");
    t.nonNull.list.field("questions", {
      type: createQuestionPayload,
    });
  },
});

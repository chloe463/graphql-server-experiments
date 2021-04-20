import { objectType } from "nexus";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("postId");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("body");
  },
});

import { objectType } from "nexus";

export const Option = objectType({
  name: "Option",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("text");
  },
});

import { objectType } from "nexus";
import { Option } from "./Option.js";

export const Question = objectType({
  name: "Question",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("type");
    t.nonNull.string("text");
    t.nonNull.list.field("options", {
      type: Option,
      resolve: async (root, args, context) => {
        const { optionsLoader } = context;
        return await optionsLoader.load(root.id);
      }
    });
  },
});

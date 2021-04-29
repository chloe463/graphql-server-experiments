import { objectType } from "nexus";
import { Option } from "./Option";

export const Question = objectType({
  name: "Question",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("type");
    t.nonNull.string("text");
    t.nonNull.list.field("options", {
      type: Option,
      resolve: async (root, args, context) => {
        const { prismaClient } = context;
        const option = await prismaClient.option.findMany({
          where: {
            questionId: root.id,
          },
        });
        return option;
      }
    });
  },
});

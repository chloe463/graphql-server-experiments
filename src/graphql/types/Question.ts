import { enumType, objectType } from "nexus";
import { Option } from "./Option";

type NexusEnumTypeConfig = Parameters<typeof enumType>[0];

const members: NexusEnumTypeConfig["members"] = [
  { name: "CHECKBOX" },
  { name: "RADIO" },
  { name: "SELECT" },
  { name: "TEXT" },
];

export const QuestionType = enumType({
  name: "QuestionType",
  members,
});

export const Question = objectType({
  name: "Question",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("type", {
      type: QuestionType,
      resolve: (question) => {
        const questionTypeNum = (question as unknown as any).type
        return (members[questionTypeNum] as unknown as any).name;
      },
    });
    t.nonNull.string("text");
    t.nonNull.list.field("options", {
      type: Option,
      resolve: async (root, args, context) => {
        const { optionsLoader } = context;
        return await optionsLoader.load(root.id);
      },
    });
  },
});

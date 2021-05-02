import { queryField } from "nexus";

export const questionnaireConnection = queryField((t) => {
  t.connectionField("questionnaireConnection", {
    type: "Questionnaire",
    nullable: false,
    nonNullDefaults: {
      output: true,
    },
    extendConnection: (t) => {
      t.int("totalCount");
    },
    resolve: async (_root, args, context) => {
      const { prismaClient } = context;
      const res = await prismaClient.questionnaire.findMany({
        where: {
          id: {
            gt: parseInt(args.after, 10),
          },
        },
        include: { questions: true },
        take: args.first,
      });

      const { count, max, min } = await prismaClient.questionnaire.aggregate({
        count: true,
        max: {
          id: true,
        },
        min: {
          id: true,
        }
      });

      const edges = res.map((row) => {
        return {
          node: row,
          cursor: `${row.id}`,
        };
      });

      const first = res[0];
      const last = res[res.length - 1];

      return {
        edges,
        totalCount: count,
        pageInfo: {
          hasNextPage: last.id !== max.id,
          hasPreviousPage: first.id !== min.id,
          startCursor: `${first.id}`,
          endCursor: `${last.id}`,
        },
      };
    },
  });
});

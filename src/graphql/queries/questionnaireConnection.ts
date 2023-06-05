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
          id: args.after ? {
            gt: Number(args.after),
          } : {
            lt: Number(args.before)
          },
          deleted: {
            equals: false,
          },
        },
        include: { questions: true },
        take: args.first || args.last,
        orderBy: {
          id: args.first ? "asc" : "desc",
        },
      });

      const { count, max, min } = await prismaClient.questionnaire.aggregate({
        count: true,
        where: {
          deleted: {
            equals: false,
          },
        },
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
      }).sort((a, b) => Number(a.cursor) - Number(b.cursor));

      const first = edges[0];
      const last = edges[res.length - 1];

      return {
        edges,
        totalCount: count,
        pageInfo: {
          hasNextPage: Number(last.cursor) !== max.id,
          hasPreviousPage: Number(first.cursor) !== min.id,
          startCursor: `${first.cursor}`,
          endCursor: `${last.cursor}`,
        },
      };
    },
  });
});

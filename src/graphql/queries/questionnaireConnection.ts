import { queryField } from "nexus";

export const questionnaireConnection = queryField((t) => {
  t.connectionField("questionnaireConnection", {
    type: "Questionnaire",
    nullable: false,
    nonNullDefaults: {
      output: true,
    },
    extendConnection: (t) => {
      t.int("totalCount", {
        resolve: async (_root, _args, context) => {
          const { prismaClient } = context;
          const { _count: count } = await prismaClient.questionnaire.aggregate({
            _count: true,
            where: {
              deleted: {
                equals: false,
              },
            },
            _max: {
              id: true,
            },
            _min: {
              id: true,
            }
          });
          return Number(count);
        }
      });
    },
    resolve: async (_root, args, context) => {
      const { prismaClient } = context;
      const res = await prismaClient.questionnaire.findMany({
        where: {
          id: {
            gt: parseInt(args.after, 10),
          },
          deleted: {
            equals: false,
          },
        },
        include: { questions: true },
        take: args.first,
      });

      const { _max: max, _min: min } = await prismaClient.questionnaire.aggregate({
        _count: true,
        where: {
          deleted: {
            equals: false,
          },
        },
        _max: {
          id: true,
        },
        _min: {
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

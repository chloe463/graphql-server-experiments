import { queryField } from "nexus";
import { Todo } from "../types";

export const todoConnection = queryField((t) => {
  t.connectionField("todoConnection", {
    type: Todo,
    nullable: false,
    nonNullDefaults: {
      output: true,
    },
    extendConnection: (t) => {
      t.int("totalCount");
    },
    resolve: async (_root, args, context) => {
      const { prismaClient } = context;
      const res = await prismaClient.todo.findMany({
        where: {
          id: {
            gt: Number(args.after),
          },
          deletedAt: {
            equals: null,
          },
        },
        take: Number(args.first),
      });
      if (res.length === 0) {
        return {
          edges: [],
          totalCount: 0,
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }

      const { _count: count, _max: max, _min: min } = await prismaClient.todo.aggregate({
        _count: true,
        _max: {
          id: true,
        },
        _min: {
          id: true,
        },
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

import { arg, mutationField } from "nexus";
import { UpdateTodoInput } from "../inputs";
import { UpdateTodoPayload } from "../types";

export const updateTodo = mutationField("updateTodo", {
  type: UpdateTodoPayload,
  args: {
    todo: arg({
      type: UpdateTodoInput,
    }),
  },
  resolve: async (_root, args, context) => {
    const { prismaClient } = context;
    const res = prismaClient.todo.update({
      where: {
        id: args.todo.id,
      },
      data: {
        task: args.todo.task,
        finishedAt: args.todo.finishedAt || null,
      },
      select: {
        id: true,
        task: true,
        finishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      todo: res,
    };
  },
});

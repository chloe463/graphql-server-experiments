import { arg, mutationField, nonNull } from "nexus";
import { UpdateTodoInput } from "../inputs/updateTodoInput.js";
import { UpdateTodoPayload } from "../types/updateTodoPayload.js";

export const updateTodo = mutationField("updateTodo", {
  type: UpdateTodoPayload,
  args: {
    todo: nonNull(
      arg({
        type: UpdateTodoInput,
      })
    ),
  },
  resolve: async (_root, args, context) => {
    const { prismaClient } = context;
    const res = await prismaClient.todo.update({
      where: {
        id: args.todo.id,
      },
      data: {
        task: args.todo.task,
        finishedAt: args.todo.finishedAt || null,
        deletedAt: null,
      },
      select: {
        id: true,
        task: true,
        finishedAt: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      todo: res,
    };
  },
});

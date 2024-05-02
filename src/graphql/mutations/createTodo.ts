import { arg, mutationField } from "nexus";
import { CreateTodoInput } from "../inputs/CreateTodoInput.js";
import { CreateTodoPayload } from "../types/CreateTodoPayload.js";

export const createTodo = mutationField("createTodo", {
  type: CreateTodoPayload,
  args: {
    todo: arg({
      type: CreateTodoInput,
    }),
  },
  resolve: async (_root, args, context) => {
    const { prismaClient } = context;
    const res = await prismaClient.todo.create({
      data: {
        task: args.todo.task,
        finishedAt: null,
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

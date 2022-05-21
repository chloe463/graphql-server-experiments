import { intArg, mutationField, nonNull } from "nexus";
import { DeleteTodoPayload } from "../types";

export const deleteTodo = mutationField("deleteTodo", {
  type: DeleteTodoPayload,
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_root, args, { prismaClient }) => {
    try {
      const res = await prismaClient.todo.update({
        where: { id: args.id },
        data: {
          deletedAt: new Date(),
        },
        select: {
          id: true,
        },
      });

      return { id: res.id, result: true };
    } catch (e) {
      console.error(e);
      return { id: args.id, result: false };
    }
  },
});

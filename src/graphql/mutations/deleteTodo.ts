import { arg, mutationField, nonNull } from "nexus";
import { DeleteTodoPayload } from "../types/DeleteTodoPayload.js";

export const deleteTodo = mutationField("deleteTodo", {
  type: DeleteTodoPayload,
  args: {
    id: nonNull(arg({ type: "TodoId" }))
  },
  resolve: async (_root, args, { prismaClient }) => {
    const id = args.id;
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

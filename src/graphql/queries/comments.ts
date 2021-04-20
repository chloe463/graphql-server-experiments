import { intArg, list, nonNull, queryField } from "nexus";

export const comments = queryField("comments", {
  type: nonNull(list("Comment")),
  args: {
    postId: nonNull(intArg())
  },
  resolve: async (_root, args, context) => {
    const { jsonPlaceholderClient } = context;
    const { comments } = await jsonPlaceholderClient.fetchComments(args.postId);
    return comments;
  },
});

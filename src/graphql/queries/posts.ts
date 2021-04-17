import { intArg, list, queryField, stringArg } from "nexus";

export const posts = queryField("posts", {
  type: list("Post"),
  args: {
    start: stringArg({ default: "0" }),
    limit: intArg({ default: 10 }),
  },
  resolve: async (_root, args, context) => {
    const { jsonPlaceholderClient } = context;
    const { posts } = await jsonPlaceholderClient.fetchPosts(args);
    return posts;
  },
});

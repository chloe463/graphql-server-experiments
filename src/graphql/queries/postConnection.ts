import { queryField } from "nexus";

export const postConnection = queryField((t) => {
  t.connectionField("postConnection", {
    type: "Post",
    nullable: false,
    nonNullDefaults: {
      output: true,
    },
    resolve: async (_root, args, context) => {
      const { jsonPlaceholderClient } = context;
      const posts = await jsonPlaceholderClient.fetchPosts({
        start: args.after,
        limit: args.first,
      });
      const edges = posts.map((post) => {
        return {
          node: post,
          cursor: `${post.id}`,
        };
      });
      return {
        edges,
        pageInfo: {
          hasNextPage: posts[posts.length - 1].id !== 100,
          hasPreviousPage: posts[0].id > 1,
        }
      };
    },
  })
});

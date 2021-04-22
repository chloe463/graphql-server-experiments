import axios, { AxiosInstance } from "axios";
import faker from "faker";
import { NexusGenObjects } from "../graphql/generated/typings";

type Post = NexusGenObjects["Post"];
type Comment = NexusGenObjects["Comment"];

const BASE_URL = "https://jsonplaceholder.typicode.com/";

type FetchPostsParams = {
  start?: string;
  limit?: number;
  page?: number;
};

type FetchPostsResponse = {
  posts: Post[];
  totalCount: number;
};

type FetchCommentsResponse = {
  comments: Comment[];
};

export class JsonPlaceholderClient {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  };

  fetchPosts = async (args: FetchPostsParams): Promise<FetchPostsResponse> => {
    const params = {};
    Object.keys(args).forEach((key) => {
      params[`_${key}`] = args[key];
    });
    const res = await this.client.get<Post[]>("/posts", {
      params: {
        ...params,
      }
    });
    return { posts: res.data, totalCount: res.headers["x-total-count"] };
  };

  makeDummyPosts = (args: FetchPostsParams): FetchPostsResponse => {
    const posts = Array.from({ length: args.limit || 10 }, (_, i) => i + 1).map((i) => {
      const id = parseInt(args.start || "0", 10) + i;
      return {
        id,
        title: faker.lorem.word(10),
        body: faker.lorem.words(100),
        userId: Math.ceil(id / 10),
      };
    });
    return { posts, totalCount: 100 };
  }

  fetchComments = async (postId: number): Promise<FetchCommentsResponse> => {
    const res = await this.client.get<Comment[]>(`/posts/${postId}/comments`);
    return { comments: res.data };
  }

  makeDummyComments = (postId: number): FetchCommentsResponse => {
    const comments: Comment[] = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
      const id = (postId - 1) + i;
      return {
        id,
        body: faker.lorem.words(100),
        email: `${faker.name.firstName()}@example.com`,
        name: faker.name.findName(),
        postId,
      }
    });

    return { comments };
  }
}

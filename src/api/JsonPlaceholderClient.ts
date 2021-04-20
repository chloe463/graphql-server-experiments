import axios, { AxiosInstance } from "axios";
import { NexusGenObjects } from "../graphql/generated/typings";

type Post = NexusGenObjects["Post"];
type Comment = NexusGenObjects["Comment"];

const BASE_URL = "https://jsonplaceholder.typicode.com/";

type FetchPostsParams = {
  start?: string;
  limit?: number;
  page?: number;
};

export class JsonPlaceholderClient {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  };

  fetchPosts = async (args: FetchPostsParams): Promise<{ posts: Post[], totalCount: number }> => {
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

  fetchComments = async (postId: number): Promise<{ comments: Comment[] }> => {
    const res = await this.client.get<Comment[]>(`/posts/${postId}/comments`);
    return { comments: res.data };
  }
}

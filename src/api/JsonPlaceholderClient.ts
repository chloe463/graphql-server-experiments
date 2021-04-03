import axios, { AxiosInstance } from "axios";
import { NexusGenObjects } from "../graphql/generated/typings";

type Post = NexusGenObjects["Post"];

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

  fetchPosts = async (args: FetchPostsParams): Promise<Post[]> => {
    const params = {};
    Object.keys(args).forEach((key) => {
      params[`_${key}`] = args[key];
    });
    const res = await this.client.get<Post[]>("/posts", {
      params: {
        ...params,
      }
    });
    return res.data;
  };
}

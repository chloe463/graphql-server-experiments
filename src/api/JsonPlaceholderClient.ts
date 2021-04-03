import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export class JsonPlaceholderClient {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  };

  fetchPosts = async (args: any) => {
    const params = {};
    Object.keys(args).forEach((key) => {
      params[`_${key}`] = args[key];
    });
    const posts = await this.client.get("/posts", {
      params: {
        ...params,
      }
    });
    return posts.data;
  };
}

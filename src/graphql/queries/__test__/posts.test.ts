import { PrismaClient } from "@prisma/client";
import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../../../testUtils";

const prismaClientMock = (PrismaClient as any) as jest.Mock<PrismaClient>;

const GET_POST_QUERY = gql`
  query GetPostsQuery($start: String, $limit: Int) {
    posts(start: $start, limit: $limit) {
      id
      userId
      title
      body
    }
  }
`;

describe("[Query] posts", () => {
  it ("return posts", async () => {
    (prismaClientMock as any).post = {
      findMany: jest.fn().mockReturnValue([
        {
          userId: 1,
          id: 1,
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          userId: 1,
          id: 3,
          title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
        },
      ]),
    };
    const server = constructTestServer({
      prismaClient: prismaClientMock,
    });

    const { query } = createTestClient(server);
    const res = await query({ query: GET_POST_QUERY, variables : { start: "0", limit: 3 }});
    expect(res).toMatchSnapshot();
  });
});

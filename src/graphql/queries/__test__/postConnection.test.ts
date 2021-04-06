import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { JsonPlaceholderClient } from "../../../api/JsonPlaceholderClient";
import { constructTestServer } from "../../../testUtils";

const jsonPlaceholderClientMock = (JsonPlaceholderClient as any) as jest.Mock<JsonPlaceholderClient>;

const GET_POST_CONNECTION = gql`
  query GetPostConnectionQuery($first: Int, $after: String) {
    postConnection(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          userId
          title
          body
        }
        cursor
      }
    }
  }
`;

describe("[Query] postConnection", () => {
  it("returns post list", async () => {
    (jsonPlaceholderClientMock as any).fetchPosts = jest.fn().mockReturnValue([
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
    ]);
    const server = constructTestServer({
      jsonPlaceholderClient: jsonPlaceholderClientMock,
    });

    const { query } = createTestClient(server);
    const res = await query({ query: GET_POST_CONNECTION, variables : { first: 3, after: "0" }});
    console.log({ res });
    expect(res).toMatchSnapshot();
  });
});

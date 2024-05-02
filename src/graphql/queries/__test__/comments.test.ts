import { gql } from "apollo-server";
import { JsonPlaceholderClient } from "../../../api/JsonPlaceholderClient";
import { constructTestServer } from "../../../testUtils";

const jsonPlaceholderClientMock = (JsonPlaceholderClient as any) as jest.Mock<JsonPlaceholderClient>;

const GET_COMMENTS_QUERY = gql`
  query GetCommentsQuery($postId: Int!) {
    comments(postId: $postId) {
      id
      postId
      name
      email
      body
    }
  }
`;

describe("[Query] comments", () => {
  it("returns comments", async () => {
    (jsonPlaceholderClientMock as any).makeDummyComments = jest.fn().mockReturnValue({
      comments: [
        {
          id: 1,
          postId: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        },
        {
          id: 2,
          postId: 1,
          name: "quo vero reiciendis velit similique earum",
          email: "Jayne_Kuhic@sydney.com",
          body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
        },
        {
          id: 3,
          postId: 1,
          name: "odio adipisci rerum aut animi",
          email: "Nikita@garfield.biz",
          body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
        },
        {
          id: 4,
          postId: 1,
          name: "alias odio sit",
          email: "Lew@alysha.tv",
          body: "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
        },
        {
          id: 5,
          postId: 1,
          name: "vero eaque aliquid doloribus et culpa",
          email: "Hayden@althea.biz",
          body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
        }
      ],
    });
    const server = constructTestServer({
      jsonPlaceholderClient: jsonPlaceholderClientMock,
    });

    const res = await server.executeOperation({ query: GET_COMMENTS_QUERY, variables: { postId: 1 } });
    expect(res).toMatchSnapshot();
  });
});

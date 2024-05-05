import { describe, expect, it, jest } from "bun:test";
import { PrismaClient } from "@prisma/client";
import gql from "graphql-tag";
import { constructTestServer } from "../../../testUtils";

const prismaClientMock = new PrismaClient();

const GET_QUESTIONNAIRE_CONNECTION = gql`
  query GetQuestionnaireConnection($first: Int, $after: String) {
    questionnaireConnection(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          description
          state
          startAt
          endAt
        }
        cursor
      }
    }
  }
`;

describe("[Query] questionnaireConnection", () => {
  it("returns questionnaire list", async () => {
    (prismaClientMock as any).questionnaire = {
      findMany: jest.fn().mockReturnValue([
        {
          id: 1,
          title: "Questionnaire.1",
          description: "ab accusantium ipsam voluptatibus vero voluptatum beatae et sed eum harum eveniet et fugiat deleniti laborum dolor ea perferendis ea eligendi molestias possimus molestiae quae et aspernatur et aut omnis",
          state: 1,
          startAt: new Date("2021-04-29T16:23:20.874Z"),
          endAt: new Date("2021-06-29T15:00:00.000Z"),
        },
        {
          id: 2,
          title: "Questionnaire.2",
          description: "voluptatibus magni et nesciunt quo commodi beatae ea error qui fugit minus nostrum dolores eaque quidem beatae error necessitatibus consequatur quibusdam sunt molestiae aut nulla dolor ad alias neque corrupti",
          state: 2,
          startAt: new Date("2021-04-29T16:23:20.874Z"),
          endAt: new Date("2021-06-29T15:00:00.000Z"),
        },
        {
          id: 3,
          title: "Questionnaire.3",
          description: "optio maiores similique dolorem aut voluptatem autem voluptatem ipsum exercitationem nihil voluptatem nemo illo quis in ut rerum et ad esse ipsa quae esse voluptas perspiciatis aspernatur possimus ut dolorem",
          state: 3,
          startAt: new Date("2021-04-29T16:23:20.874Z"),
          endAt: new Date("2021-06-29T15:00:00.000Z"),
        },
      ]),
      aggregate: jest.fn().mockReturnValue({
        _count: 3,
        _min: { id: 1 },
        _max: { id: 3 },
      }),
    };
    const server = constructTestServer();

    const res = await server.executeOperation(
      { query: GET_QUESTIONNAIRE_CONNECTION, variables: { first: 3, after: "0" } },
      {
        contextValue: {
          prismaClient: prismaClientMock,
        }
      }
    );
    expect(res).toMatchSnapshot();
  });
});

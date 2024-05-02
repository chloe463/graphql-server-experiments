import { PrismaClient } from "@prisma/client";
import gql from "graphql-tag";
import { constructTestServer } from "../../../testUtils";

const prismaClientMock = (PrismaClient as any) as jest.Mock<PrismaClient>;

type DeleteQuestionnaireVariables = {
  id: number;
}
type DeleteQuestionnaireResponse = {
  result: boolean;
};

const DELETE_QUESTIONNAIRE_MUTATION = gql`
  mutation DeleteQuestionnaire($id: Int!) {
    deleteQuestionnaire(id: $id) {
      result
    }
  }
`;

describe("[Mutation] deleteQuestionnaire", () => {
  it("can soft delete questionnaire", async () => {
    (prismaClientMock as any).questionnaire = {
      update: jest.fn().mockReturnValue(true),
    };
    const server = constructTestServer();

    const res = await server.executeOperation({
      query: DELETE_QUESTIONNAIRE_MUTATION,
      variables: {
        id: 1,
      },
    }, {
      contextValue: {
        prismaClient: prismaClientMock,
      }
    });
    expect(res).toMatchSnapshot();
  });
});

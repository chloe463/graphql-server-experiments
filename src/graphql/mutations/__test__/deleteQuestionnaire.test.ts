import { PrismaClient } from "@prisma/client";
import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
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
    const server = constructTestServer({
      prismaClient: prismaClientMock,
    });

    const { mutate } = createTestClient(server);
    const res = await mutate<DeleteQuestionnaireResponse, DeleteQuestionnaireVariables>({
      mutation: DELETE_QUESTIONNAIRE_MUTATION,
      variables: {
        id: 1,
      },
    });
    expect(res).toMatchSnapshot();
  });
});

import { PrismaClient } from "@prisma/client";
import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import DataLoader from "dataloader";
import { constructTestServer } from "../../../testUtils";
import { NexusGenInputs, NexusGenObjects } from "../../generated/typings";

const prismaClientMock = (PrismaClient as any) as jest.Mock<PrismaClient>;
const optionsLoaderMock = (DataLoader as any) as jest.Mock<DataLoader<number, any, number>>

type Variables = NexusGenInputs["CreateQuestionnaireInput"];
type Result = NexusGenObjects["CreateQuestionnairePayload"]["questionnaire"];

const CREATE_QUESTIONNAIRE_MUTATION = gql`
  mutation CreateQuestionnaire($questionnaire: CreateQuestionnaireInput!) {
    createQuestionnaire(questionnaire: $questionnaire) {
      questionnaire {
        id
        title
        description
        state
        startAt
        endAt
        questions {
          id
          text
          type
          options {
            id
            text
          }
        }
      }
    }
  }
`;

describe("[Mutation] createQuestionnaire", () => {
  it("can create new questionnaire", async () => {
    const variables: Variables = {
      title: "Test questionnaire",
      description: "inventore eum sed laboriosam qui repudiandae in eum quidem illo",
      state: 1,
      startAt: "2021-01-01 00:00:00",
      endAt: "2021-01-31 23:59:59",
      questions: [
        {
          type: 1,
          text: "Question1",
          required: false,
          options: [
            { text: "Option1-1" },
            { text: "Option1-2" },
          ],
        },
        {
          type: 2,
          text: "Question2",
          required: true,
          options: [
            { text: "Option2-1" },
            { text: "Option2-2" },
          ],
        },
      ],
    };
    (prismaClientMock as any).questionnaire = {
      create: jest.fn().mockReturnValue({
        id: 1,
        title: "Test questionnaire",
        description: "inventore eum sed laboriosam qui repudiandae in eum quidem illo",
        state: 1,
        startAt: new Date("2021-01-01 00:00:00"),
        endAt: new Date("2021-01-31 23:59:59"),
        questions: [
          {
            id: 1,
            type: 1,
            text: "Question1",
            required: false,
            options: [
              { id: 1, text: "Option1-1" },
              { id: 2, text: "Option1-2" },
            ],
          },
          {
            id: 2,
            type: 2,
            text: "Question2",
            required: true,
            options: [
              { id: 1, text: "Option2-1" },
              { id: 2, text: "Option2-2" },
            ],
          },
        ],
      }),
    };
    (optionsLoaderMock as any).load = (id: number) => {
      return [
        { id: 1, text: `Option${id}-1` },
        { id: 2, text: `Option${id}-2` },
      ];
    };
    const server = constructTestServer({
      prismaClient: prismaClientMock,
      optionsLoader: optionsLoaderMock,
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CREATE_QUESTIONNAIRE_MUTATION,
      variables: {
        questionnaire: variables,
      },
    });
    expect(res).toMatchSnapshot();
  });
});

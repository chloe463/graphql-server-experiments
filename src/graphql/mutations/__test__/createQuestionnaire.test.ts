import { PrismaClient } from "@prisma/client";
import { describe, expect, it, jest } from "bun:test";
import DataLoader from "dataloader";
import { gql } from "graphql-tag";
import { constructTestServer } from "../../../testUtils";
import type { NexusGenInputs, NexusGenObjects, NexusGenRootTypes } from "../../generated/typings";

const prismaClientMock = new PrismaClient();
const optionsLoaderMock = new DataLoader(() => void 0);

type CreateQuestionnaireInput = NexusGenInputs["CreateQuestionnaireInput"];
type CreateQuestionnaireVariables = {
  input: CreateQuestionnaireInput
};
type CreateQuestionnaireResponse =
  Partial<Omit<NexusGenObjects["CreateQuestionnairePayload"]["questionnaire"], "questions">>
  & {
    questions?: Array<
      Partial<Omit<NexusGenRootTypes["Question"], "options"> & {
        options?: Array<Partial<NexusGenRootTypes["Option"]>>
      }>
    >
  };

const CREATE_QUESTIONNAIRE_MUTATION = gql`
  mutation CreateQuestionnaire($input: CreateQuestionnaireInput!) {
    createQuestionnaire(questionnaire: $input) {
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
    const createQuestionnaireInput: CreateQuestionnaireInput = {
      title: "Test questionnaire",
      description: "inventore eum sed laboriosam qui repudiandae in eum quidem illo",
      state: 1,
      startAt: new Date("2021-01-01 00:00:00"),
      endAt: new Date("2021-01-31 23:59:59"),
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
    const server = constructTestServer();

    const res = await server.executeOperation({
      query: CREATE_QUESTIONNAIRE_MUTATION,
      variables: {
        input: createQuestionnaireInput,
      },
    }, {
      contextValue: {
        prismaClient: prismaClientMock,
        optionsLoader: optionsLoaderMock,
      }
    });
    expect(res).toMatchSnapshot();
  });
});

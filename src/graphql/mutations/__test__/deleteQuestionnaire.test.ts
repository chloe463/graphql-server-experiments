import { PrismaClient } from "@prisma/client";
import { NexusGenInputs, NexusGenObjects } from "../../generated/typings";

const prismaClientMock = (PrismaClient as any) as jest.Mock<PrismaClient>;

type Variables = NexusGenInputs["CreateQuestionnaireInput"];
type Result = NexusGenObjects["CreateQuestionnairePayload"]["questionnaire"];


describe("[Mutation] deleteQuestionnaire", () => {
  it.skip("can soft delete questionnaire", async () => {
  });
});

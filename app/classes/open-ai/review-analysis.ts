import { OpenAIModels } from "@/app/enums/openai/openai-models";
import { OpenAITemperatures } from "@/app/enums/openai/openai-temperatures";
import { buildPromptReview } from "@/app/helpers/ai/prompt-review";
import { DEFINITION_SYSTEM_TRAVEL_ASSISTANT_REVIEW_ANALYZER_JSON } from "@/app/helpers/ai/system-definition-json";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { ReviewData } from "@/app/types/db/review";
import { OpenAIResponses } from "./openai-response";

export class ReviewAnalysis {
  private openAIResponses: OpenAIResponses;
  private directiveSystem: string;

  constructor() {
    this.openAIResponses = new OpenAIResponses({
      model: OpenAIModels.GPT_4_O_MINI,
      temperature: OpenAITemperatures.BALANCED_CREATIVE,
      format: "json",
    });

    this.directiveSystem =
      DEFINITION_SYSTEM_TRAVEL_ASSISTANT_REVIEW_ANALYZER_JSON;
  }

  async analyzeReview(
    review: ReviewData
  ): Promise<ResponseOpenAITravelReviewAnalysis> {
    try {
      // Build the prompt for OpenAI analysis
      const prompt = buildPromptReview(review);

      // Get OpenAI analysis
      const analysis = await this.openAIResponses.createResponse(
        prompt,
        this.directiveSystem
      );

      return analysis;
    } catch (error) {
      console.log("\n\n--------------------------------");
      console.log("ReviewAnalysis ~ error:");
      console.log( error);
      console.log("\n\n--------------------------------");

      throw new Error(
        `Failed to analyze review: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}

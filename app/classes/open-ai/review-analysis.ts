import { OpenAIModels } from "@/app/enums/openai/openai-models";
import { OpenAITemperatures } from "@/app/enums/openai/openai-temperatures";
import { buildPromptReview } from "@/app/helpers/ai/prompt-review";
import { DEFINITION_SYSTEM_TRAVEL_ASSISTANT_REVIEW_ANALYZER_JSON } from "@/app/helpers/ai/system-definition-json";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { ReviewData } from "@/app/types/db/review";
import { APIError } from "openai";
import { OpenAIResponses } from "./openai-response";

export class ReviewAnalysis {
  private openAIResponses: OpenAIResponses;
  private directiveSystem: string;

  constructor() {
    this.openAIResponses = new OpenAIResponses({
      model: OpenAIModels.GPT_4_O_MINI,
      temperature: OpenAITemperatures.BALANCED_CREATIVE
    });

    this.directiveSystem =
      DEFINITION_SYSTEM_TRAVEL_ASSISTANT_REVIEW_ANALYZER_JSON;
  }

  async analyzeReview(
    review: ReviewData
  ): Promise<ResponseOpenAITravelReviewAnalysis> {
    try {
      console.time("[ReviewAnalysis] analyzeReview execution time");
      console.log("-- analyzeReview --------------------------------");
      console.log("-- analyzeReview 1 ---");
      // Build the prompt for OpenAI analysis
      const prompt = buildPromptReview(review);

      console.log("-- analyzeReview 2 ---");
      // Get OpenAI analysis
      const analysis = await this.openAIResponses.createResponse(
        prompt,
        this.directiveSystem
      );

      console.log("-- analyzeReview 3 ---");
      console.timeEnd("[ReviewAnalysis] analyzeReview execution time");
      return analysis;
    } catch (error) {
      console.log("-- analyzeReview 4 ---");
      console.log("🚀 ~ ReviewAnalysis ~ error:", error);

      if (error instanceof APIError) {
        throw new Error("API Error: " + error.message);
      }

      throw new Error(
        `Failed to analyze review: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

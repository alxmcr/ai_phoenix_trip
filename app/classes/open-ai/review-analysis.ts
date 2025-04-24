import { OpenAIModels } from "@/app/enums/openai/openai-models";
import { OpenAITemperatures } from "@/app/enums/openai/openai-temperatures";
import { DEFINITION_SYSTEM_TRAVEL_ASSISTANT_REVIEW_ANALYZER_JSON } from "@/app/helpers/ai/system-definition-json";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { ReviewData } from "@/app/types/db/review";
import { APIError } from "openai";
import { OpenAIResponses } from "./openai-response";

export class ReviewAnalysis {
  private openAIResponses: OpenAIResponses;
  private prompt: string;
  private directiveSystem: string;
  private review: ReviewData | null;
  private analysis: ResponseOpenAITravelReviewAnalysis | null;

  constructor() {
    this.openAIResponses = new OpenAIResponses({
      model: OpenAIModels.GPT_4_O_MINI,
      temperature: OpenAITemperatures.BALANCED_CREATIVE,
    });

    this.prompt = "";
    this.directiveSystem =
      DEFINITION_SYSTEM_TRAVEL_ASSISTANT_REVIEW_ANALYZER_JSON;

    this.review = null;
    this.analysis = null;
  }

  // Getters
  getPrompt(): string {
    return this.prompt;
  }

  getReview(): ReviewData | null {
    return this.review;
  }

  getAnalysis(): ResponseOpenAITravelReviewAnalysis | null {
    return this.analysis;
  }

  // Setters
  setPrompt(prompt: string) {
    this.prompt = prompt;
  }

  setReview(review: ReviewData) {
    this.review = review;
  }

  setAnalysis(analysis: ResponseOpenAITravelReviewAnalysis) {
    this.analysis = analysis;
  }

  async analyzeReview(): Promise<ResponseOpenAITravelReviewAnalysis> {
    try {
      // Check if the prompt is set
      if (!this.prompt) {
        throw new Error("Prompt is not set");
      }

      // Check if the directive system is set
      if (!this.directiveSystem) {
        throw new Error("Directive system is not set");
      }

      // Check if the review is set
      if (!this.review) {
        throw new Error("Review is not set");
      }

      // Get OpenAI analysis
      const analysis = await this.openAIResponses.createResponse(
        this.prompt,
        this.directiveSystem
      );

      return analysis;
    } catch (error) {
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

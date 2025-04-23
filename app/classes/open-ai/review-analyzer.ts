import { openai } from "@/app/config/ai/openai-client";
import { TRAVEL_ASSISTANT_REVIEW_ANALYZER } from "@/app/config/ai/openai-system-directives";
import { OpenAIMessageRoles } from "@/app/enums/openai/openai-message-roles";
import { OpenAIModelsCostOptimized } from "@/app/enums/openai/openai-models";
import { OpenAITemperatures } from "@/app/enums/openai/openai-temperatures";
import { buildPromptReview } from "@/app/helpers/ai/prompt-review";
import { ReviewData } from "@/app/types/db/review";

export class ReviewAnalyzer {
  private model: OpenAIModelsCostOptimized;
  private temperature: OpenAITemperatures;
  private directiveSystem: string;
  private maxTokens: number;

  constructor() {
    this.model = OpenAIModelsCostOptimized.GPT_3_5_TURBO;
    this.temperature = OpenAITemperatures.BALANCED_CREATIVE;
    this.directiveSystem = TRAVEL_ASSISTANT_REVIEW_ANALYZER;
    this.maxTokens = 2000;
  }

  // Use the Responses API from OpenAI to analyze the review
  // Source: https://platform.openai.com/docs/api-reference/responses/create
  // Roles: system, user
  async analyzeReview(review: ReviewData) {
    const prompt = buildPromptReview(review);

    // Create a response from OpenAI
    const response = await openai.chat.completions.create({
      model: this.model,
      store: false,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
      response_format: { type: "json_object" },
      messages: [
        {
          role: OpenAIMessageRoles.SYSTEM,
          content: this.directiveSystem,
        },
        {
          role: OpenAIMessageRoles.USER,
          content: prompt,
        },
      ],
    });

    // Print the response
    console.log("🚀 ~ ReviewAnalyzer ~ analyzeReview ~ response:", response);

    // Printy typeof response
    console.log(
      "🚀 ~ ReviewAnalyzer ~ analyzeReview ~ typeof response:",
      typeof response
    );

    return response;
  }
}

import { OpenAIMessageRoles } from "@/app/enums/openai-message-roles";
import { OpenAIModelsCostOptimized } from "@/app/enums/openai-models";
import { OpenAITemperatures } from "@/app/enums/openai-temperatures";
import { openai } from "@/app/lib/ai/openai-client";
import { TRAVEL_ASSISTANT_REVIEW_ANALYZER } from "@/app/lib/ai/openai-system-directives";

export class ReviewAnalyzer {
  private model: OpenAIModelsCostOptimized;
  private temperature: OpenAITemperatures;
  private directiveSystem: string;

  constructor() {
    this.model = OpenAIModelsCostOptimized.GPT_4_O_MINI;
    this.temperature = OpenAITemperatures.BALANCED_CREATIVE;
    this.directiveSystem = TRAVEL_ASSISTANT_REVIEW_ANALYZER;
  }

  // Use the Responses API from OpenAI to analyze the review
  // Source: https://platform.openai.com/docs/guides/responses
  // Roles: system, user
  async analyzeReview(review: string) {
    const prompt = "";

    const response = await openai.responses.create({
      temperature: this.temperature,
      model: this.model,
      input: [
        {
          role: OpenAIMessageRoles.SYSTEM,
          content: this.directiveSystem,
        },
        { role: OpenAIMessageRoles.USER, content: prompt },
      ],
    });
  }
}

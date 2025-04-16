import { OpenAIModels } from "@/app/enums/openai-models";
import { OpenAIRoles } from "@/app/enums/openai-roles";
import { OpenAITemperatures } from "@/app/enums/openai-temperatures";
import { openai } from "@/app/lib/ai/openai-client";

export class ReviewAnalyzer {
  // Use the Responses API from OpenAI to analyze the review
  // Source: https://platform.openai.com/docs/guides/responses
  // Roles: system, user
  static async analyzeReview(review: string) {
    const prompt = "";

    const response = await openai.responses.create({
      temperature: OpenAITemperatures.BALANCED_CREATIVE,
      model: OpenAIModels.GPT_4_O,
      input: [
        {
          role: OpenAIRoles.SYSTEM,
          content: "You are a helpful assistant that analyzes reviews.",
        },
        { role: OpenAIRoles.USER, content: prompt },
      ],
    });
  }
}

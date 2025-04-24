import { openai } from "@/app/config/ai/openai-client";
import { OpenAIMessageRoles } from "@/app/enums/openai/openai-message-roles";
import { OpenAIModels } from "@/app/enums/openai/openai-models";
import { OpenAITemperatures } from "@/app/enums/openai/openai-temperatures";
import { validateOpenAIResponse } from "@/app/helpers/validations-openai/openai-response-validation";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { APIError } from "openai";

export interface ResponseOptions {
  model?: OpenAIModels;
  temperature?: OpenAITemperatures;
  maxTokens?: number;
}

export class OpenAIResponses {
  private model: OpenAIModels;
  private temperature: OpenAITemperatures;
  private maxTokens: number;

  constructor(options: ResponseOptions = {}) {
    this.model = options.model || OpenAIModels.GPT_4_O_MINI;
    this.temperature =
      options.temperature || OpenAITemperatures.BALANCED_CREATIVE;
    this.maxTokens = options.maxTokens || 1000;
  }

  async createResponse(
    prompt = "",
    directiveSystem = ""
  ): Promise<ResponseOpenAITravelReviewAnalysis> {

    console.log("\n createResponse 1 --------------------------------");

    if (!directiveSystem) {
      throw new Error("Directive system is required");
    }

    console.log("\n createResponse 2 --------------------------------");
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    console.log("\n createResponse 3 --------------------------------");

    if (!openai) {
      throw new Error("OpenAI client is not available");
    }

    try {
      console.log("\n createResponse 4 --------------------------------");

      const response = await openai.responses.create({
        model: this.model,
        input: [
          {
            role: OpenAIMessageRoles.SYSTEM,
            content: directiveSystem,
          },
          {
            role: OpenAIMessageRoles.USER,
            content: prompt,
          },
        ],
        temperature: this.temperature,
        max_output_tokens: this.maxTokens,
        text: {
          format: {
            type: "json_schema",
            name: "review_analyzed",
            schema: {
              type: "object",
              properties: {
                sentiment: {
                  type: "object",
                  properties: {
                    score: { type: "number" },
                    label: { type: "string" },
                    summary: { type: "string" },
                    emotion_tone: { type: "string" },
                  },
                  required: ["score", "label", "summary", "emotion_tone"],
                  additionalProperties: false,
                },
                actionables: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      priority: { type: "string" },
                      department: { type: "string" },
                      category: { type: "string" },
                      source_aspect: { type: "string" },
                    },
                    required: [
                      "title",
                      "description",
                      "priority",
                      "department",
                      "category",
                      "source_aspect",
                    ],
                    additionalProperties: false,
                  },
                },
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      impact: { type: "string" },
                      target_area: { type: "string" },
                      effort_level: { type: "string" },
                      data_driven: { type: "boolean" },
                    },
                    required: [
                      "title",
                      "description",
                      "impact",
                      "target_area",
                      "effort_level",
                      "data_driven",
                    ],
                    additionalProperties: false,
                  },
                },
              },
              required: ["sentiment", "actionables", "recommendations"],
              additionalProperties: false,
            },
          },
        },
      }, { timeout: 30000 }); // Using a fixed 30-second timeout

      console.log("\n createResponse 5 --------------------------------");

      if (!response.output_text) {
        throw new Error("Invalid response from OpenAI");
      }

      console.log("\n createResponse 6 --------------------------------");

      const parsedResponse: ResponseOpenAITravelReviewAnalysis = JSON.parse(response.output_text);

      console.log("\n createResponse 7 --------------------------------");
      validateOpenAIResponse(parsedResponse);

      console.log("\n createResponse 8 --------------------------------");
      return parsedResponse;
    } catch (error: unknown) {
      console.log("\n createResponse 9 --------------------------------");
      if (error instanceof APIError) {
        throw new Error(`API Error: ${error.message}`);
      }

      console.log("\n createResponse 10 --------------------------------");
      if (error instanceof Error && error.message.includes('timeout')) {
        throw new Error('Request timed out after 30 seconds');
      }

      console.log("\n createResponse 11 --------------------------------");
      throw new Error(
        `Failed to create response: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}

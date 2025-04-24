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
  format?: "json" | "text";
  timeout?: number;
}

export class OpenAIResponses {
  private model: OpenAIModels;
  private temperature: OpenAITemperatures;
  private maxTokens: number;
  private format: "json" | "text";
  private timeout: number;

  constructor(options: ResponseOptions = {}) {
    this.model = options.model || OpenAIModels.GPT_4_O_MINI;
    this.temperature =
      options.temperature || OpenAITemperatures.BALANCED_CREATIVE;
    this.maxTokens = options.maxTokens || 1000;
    this.format = options.format || "text";
    this.timeout = options.timeout || 30000;
  }

  async createResponse(
    prompt = "",
    directiveSystem = ""
  ): Promise<ResponseOpenAITravelReviewAnalysis> {
    if (!directiveSystem) {
      throw new Error("Directive system is required");
    }

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    if (!openai) {
      throw new Error("OpenAI client is not available");
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

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
      }, { signal: controller.signal });

      clearTimeout(timeoutId);

      if (!response.output_text) {
        throw new Error("Invalid response from OpenAI");
      }

      const parsedResponse: ResponseOpenAITravelReviewAnalysis = JSON.parse(response.output_text);
      validateOpenAIResponse(parsedResponse);

      return parsedResponse;
    } catch (error: unknown) {
      if (error instanceof APIError) {
        throw new Error(`API Error: ${error.message}`);
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timed out after ${this.timeout}ms`);
      }

      throw new Error(
        `Failed to create response: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}

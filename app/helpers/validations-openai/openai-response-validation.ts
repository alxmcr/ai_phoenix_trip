import { ValidationError } from "@/app/classes/errors/error-handler";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { validateRecommendation } from "../validations-db/recommendation-validation";
import { validateSentiment } from "../validations-db/sentiment-validation";
import { validateActionable } from "../validations-db/actionable-validation";
import { openAIResponseSchema } from "@/app/schema/zod-schemas";

export function validateRequiredFields(
  response: Partial<ResponseOpenAITravelReviewAnalysis>
): void {
  // check if the response is empty
  if (Object.keys(response).length === 0) {
    throw new ValidationError("OpenAI response data is required");
  }

  // check if sentiment is present
  if (!response.sentiment) {
    throw new ValidationError("sentiment is required in OpenAI response");
  }

  // check if actionables is present
  if (!response.actionables) {
    throw new ValidationError("actionables are required in OpenAI response");
  }

  // check if recommendations is present
  if (!response.recommendations) {
    throw new ValidationError(
      "recommendations are required in OpenAI response"
    );
  }
}

export function validateFieldFormats(
  response: Partial<ResponseOpenAITravelReviewAnalysis>
): void {
  // validate sentiment using existing validation
  if (response.sentiment) {
    validateSentiment(response.sentiment);
  }

  // validate actionables using existing validation
  if (response.actionables) {
    if (!Array.isArray(response.actionables)) {
      throw new ValidationError("actionables must be an array");
    }
    response.actionables.forEach((actionable, index) => {
      try {
        validateActionable(actionable);
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new ValidationError(`actionable[${index}] ${error.message}`);
        }
        throw error;
      }
    });
  }

  // validate recommendations using existing validation
  if (response.recommendations) {
    if (!Array.isArray(response.recommendations)) {
      throw new ValidationError("recommendations must be an array");
    }
    response.recommendations.forEach((recommendation, index) => {
      try {
        validateRecommendation(recommendation);
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new ValidationError(
            `recommendation[${index}] ${error.message}`
          );
        }
        throw error;
      }
    });
  }
}

export function validateOpenAIResponse(
  response: Partial<ResponseOpenAITravelReviewAnalysis>
): void {
  try {
    // Validate the response using Zod schema
    openAIResponseSchema.parse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError(`Invalid OpenAI response: ${error.message}`);
    }
    throw new ValidationError("Invalid OpenAI response");
  }
}

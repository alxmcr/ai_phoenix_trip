import { ValidationError } from "@/app/classes/errors/error-handler";
import { RecommendationData } from "../../types/db/recommendation";

export function validateRequiredFields(recommendation: Partial<RecommendationData>): void {
  // check if the recommendation is empty
  if (Object.keys(recommendation).length === 0) {
    throw new ValidationError("recommendation data is required");
  }

  // check if the review_id is empty
  if (!recommendation.review_id) {
    throw new ValidationError("review_id is required");
  }

  // check if the data_driven is empty
  if (recommendation.data_driven === undefined) {
    throw new ValidationError("data_driven is required");
  }

  // check if the target_area is empty
  if (!recommendation.target_area) {
    throw new ValidationError("target_area is required");
  }

  // check if the effort_level is empty
  if (!recommendation.effort_level) {
    throw new ValidationError("effort_level is required");
  }

  // check if the title is empty
  if (!recommendation.title) {
    throw new ValidationError("title is required");
  }

  // check if the description is empty
  if (!recommendation.description) {
    throw new ValidationError("description is required");
  }

  // check if the impact is empty
  if (!recommendation.impact) {
    throw new ValidationError("impact is required");
  }
}

export function validateFieldFormats(recommendation: Partial<RecommendationData>): void {
  // check if target_area is valid
  if (recommendation.target_area && recommendation.target_area.length < 3) {
    throw new ValidationError("target_area must be at least 3 characters long");
  }

  // check if effort_level is valid
  if (recommendation.effort_level && recommendation.effort_level.length < 3) {
    throw new ValidationError("effort_level must be at least 3 characters long");
  }

  // check if title is valid
  if (recommendation.title && recommendation.title.length < 3) {
    throw new ValidationError("title must be at least 3 characters long");
  }

  // check if description is valid
  if (recommendation.description && recommendation.description.length < 10) {
    throw new ValidationError("description must be at least 10 characters long");
  }

  // check if impact is valid
  if (recommendation.impact && recommendation.impact.length < 3) {
    throw new ValidationError("impact must be at least 3 characters long");
  }
}

export function validateRecommendation(recommendation: Partial<RecommendationData>, requireAllFields = true): void {
  if (requireAllFields) {
    validateRequiredFields(recommendation);
  }
  validateFieldFormats(recommendation);
}
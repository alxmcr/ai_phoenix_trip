import { RecommendationData } from "@/app/types/db/recommendation";
import { validate as validateUUID } from "uuid";

export class ValidationRecommendation {
  // Check all the fields are filled on Recommendation
  static validateRecommendation(recommendation: RecommendationData) {
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }

    const emptyFields: string[] = [];

    // check if the recommendation id is valid
    if (!validateUUID(recommendation.recommendation_id)) {
      emptyFields.push("recommendation_id");
    }

    // check if the review id is valid
    if (!validateUUID(recommendation.review_id)) {
      emptyFields.push("review_id");
    }

    // check if the recommendation text is valid
    if (!recommendation.recommendation_text) {
      emptyFields.push("recommendation_text");
    }

    if (emptyFields.length > 0) {
      throw new Error(`The following fields are empty: ${emptyFields.join(", ")}`);
    }

    return true;
  }
}

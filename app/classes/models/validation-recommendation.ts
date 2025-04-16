import { RecommendationData } from "@/app/types/db/recommendation";
import { validate as validateUUID } from "uuid";

export class ValidationRecommendation {
  // Check all the fields are filled on Recommendation
  static validateRecommendation(recommendation: RecommendationData) {
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }

    // check if the recommendation id is valid
    if (!validateUUID(recommendation.recommendation_id)) {
      throw new Error("Recommendation ID is not valid");
    }

    // check if the review id is valid
    if (!validateUUID(recommendation.review_id)) {
      throw new Error("Review ID is not valid");
    }

    // check if the recommendation text is valid
    if (!recommendation.recommendation_text) {
      throw new Error("Recommendation text is not valid");
    }

    return true;
  }
}

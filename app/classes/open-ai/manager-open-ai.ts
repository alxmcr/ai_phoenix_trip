import { ReviewAIResponse } from "@/app/types/ai/review-ai-response";
import { ActionableData } from "@/app/types/db/actionable";
import { RecommendationData } from "@/app/types/db/recommendation";
import { ReviewData } from "@/app/types/db/review";
import { SentimentData } from "@/app/types/db/sentiment";
import { ValidationReview } from "../models/validation-review";

export class ManagerOpenAI {
  // Analyze the review
  static async analyzeReview(review: ReviewData): Promise<ReviewAIResponse> {
    // validate the review
    const isValid = ValidationReview.validateReview(review);

    if (!isValid) {
      throw new Error("Review is not valid");
    }

    // Analyze the review with OpenAI

    // Add extra information to the review

    // a. Relationship between review and actionable
    // Mock actionable
    const actionables: Partial<ActionableData>[] = [
      {
        review_id: review.review_id,
        action_text: `"Actionable 1 (review_id: ${review.review_id})"`,
      },
      {
        review_id: review.review_id,
        action_text: `"Actionable 2 (review_id: ${review.review_id})"`,
      },
      {
        review_id: review.review_id,
        action_text: `"Actionable 3 (review_id: ${review.review_id})"`,
      },
    ];

    // b. Relationship between review and sentiment
    // Mock sentiment
    const sentiments: Partial<SentimentData>[] = [
      {
        review_id: review.review_id,
        sentiment_text: `"Sentiment 1 (review_id: ${review.review_id})"`,
      },
      {
        review_id: review.review_id,
        sentiment_text: `"Sentiment 2 (review_id: ${review.review_id})"`,
      },
    ];

    // c. Relationship between review and recommendation
    // Mock recommendation
    const recommendations: Partial<RecommendationData>[] = [
      {
        review_id: review.review_id,
        recommendation_text: `"Recommendation 1 (review_id: ${review.review_id})"`,
      },
      {
        review_id: review.review_id,
        recommendation_text: `"Recommendation 2 (review_id: ${review.review_id})"`,
      },
      {
        review_id: review.review_id,
        recommendation_text: `"Recommendation 3 (review_id: ${review.review_id})"`,
      },
      {
        review_id: review.review_id,
        recommendation_text: `"Recommendation 4 (review_id: ${review.review_id})"`,
      },
    ];

    // Build the response
    const response: ReviewAIResponse = {
      review_id: review.review_id,
      actionable: actionables,
      sentiment: sentiments,
      recommendation: recommendations,
    };

    return response;
  }
}

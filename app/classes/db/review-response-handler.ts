import { ReviewData } from "@/app/types/db/review";
import { ActionableDB } from "./actionable-db";
import { RecommendationDB } from "./recommendation-db";
import { ReviewDB } from "./review-db";
import { SentimentDB } from "./sentiment-db";
import { ResponseOpenAITravelReviewAnalysis } from "@/app/types/ai/openai-response";
import { ResponseReviewInsert } from "@/app/types/api/response-review";

export class ReviewResponseHandler {
  private reviewDb: ReviewDB;
  private sentimentDb: SentimentDB;
  private actionableDb: ActionableDB;
  private recommendationDb: RecommendationDB;

  constructor() {
    this.reviewDb = new ReviewDB();
    this.sentimentDb = new SentimentDB();
    this.actionableDb = new ActionableDB();
    this.recommendationDb = new RecommendationDB();
  }

  async handleInsertReview(review: ReviewData): Promise<string> {
    // Store the review
    const reviewCreated = await this.reviewDb.insert(review);

    // Check if the review was created successfully
    if (!reviewCreated) {
      throw new Error("Failed to create review");
    }

    // Get the review ID
    const reviewId = reviewCreated.review_id;

    // Check if the review ID is valid
    if (!reviewId) {
      throw new Error("Failed to get review ID");
    }

    return reviewId;
  }

  async handleResponse(
    review: ReviewData,
    analysis: ResponseOpenAITravelReviewAnalysis
  ): Promise<ResponseReviewInsert> {
    try {
      // Get the review ID, from the new review
      const reviewId = await this.handleInsertReview(review);

      // Check if the review ID is valid
      if (!reviewId) {
        throw new Error("Failed to get review ID");
      }

      // Store the sentiment analysis
      const sentiment = await this.sentimentDb.insert({
        review_id: reviewId,
        score: analysis.sentiment.score,
        label: analysis.sentiment.label,
        summary: analysis.sentiment.summary,
        emotion_tone: analysis.sentiment.emotion_tone,
      });

      // Store the actionables
      const actionables = await Promise.all(
        analysis.actionables.map((actionable) =>
          this.actionableDb.insert({
            review_id: reviewId,
            title: actionable.title,
            description: actionable.description,
            priority: actionable.priority,
            department: actionable.department,
            category: actionable.category,
            source_aspect: actionable.source_aspect,
          })
        )
      );

      // Store the recommendations
      const recommendations = await Promise.all(
        analysis.recommendations.map((recommendation) =>
          this.recommendationDb.insert({
            review_id: reviewId,
            title: recommendation.title,
            description: recommendation.description,
            impact: recommendation.impact,
            target_area: recommendation.target_area,
            effort_level: recommendation.effort_level,
            data_driven: recommendation.data_driven,
          })
        )
      );

      // Build the response
      const response: ResponseReviewInsert = {
        review_id: reviewId,
        analysis: {
          sentiment: {
            score: sentiment.score,
            label: sentiment.label,
            summary: sentiment.summary,
            emotion_tone: sentiment.emotion_tone,
          },
          actionables: actionables,
          recommendations: recommendations,
        },
      };

      return response;
    } catch (error) {
      throw new Error(
        `Failed to handle review response: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}

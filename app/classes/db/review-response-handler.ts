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

  private async insertReview(review: ReviewData): Promise<string> {
    try {
      console.time("[ReviewResponseHandler] insertReview execution time");
      console.log("[ReviewResponseHandler] Inserting review...");
      const reviewCreated = await this.reviewDb.insert(review);

      if (!reviewCreated) {
        throw new Error("Failed to create review");
      }

      const reviewId = reviewCreated.review_id;
      if (!reviewId) {
        throw new Error("Failed to get review ID");
      }

      console.log(`[ReviewResponseHandler] Review inserted successfully with ID: ${reviewId}`);
      console.timeEnd("[ReviewResponseHandler] insertReview execution time");
      return reviewId;
    } catch (error) {
      console.error("[ReviewResponseHandler] Error inserting review:", error);
      throw new Error(`Failed to insert review: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private async insertSentiment(reviewId: string, sentiment: ResponseOpenAITravelReviewAnalysis['sentiment']) {
    try {
      console.time("[ReviewResponseHandler] insertSentiment execution time");
      console.log(`[ReviewResponseHandler] Inserting sentiment for review ${reviewId}...`);
      const result = await this.sentimentDb.insert({
        review_id: reviewId,
        score: sentiment.score,
        label: sentiment.label,
        summary: sentiment.summary,
        emotion_tone: sentiment.emotion_tone,
      });
      console.log(`[ReviewResponseHandler] Sentiment inserted successfully for review ${reviewId}`);
      console.timeEnd("[ReviewResponseHandler] insertSentiment execution time");
      return result;
    } catch (error) {
      console.error(`[ReviewResponseHandler] Error inserting sentiment for review ${reviewId}:`, error);
      throw new Error(`Failed to insert sentiment: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private async insertActionables(reviewId: string, actionables: ResponseOpenAITravelReviewAnalysis['actionables']) {
    try {
      console.time("[ReviewResponseHandler] insertActionables execution time");
      console.log(`[ReviewResponseHandler] Inserting actionables for review ${reviewId}...`);
      const results = await Promise.all(
        actionables.map((actionable) =>
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
      console.log(`[ReviewResponseHandler] ${results.length} actionables inserted successfully for review ${reviewId}`);
      console.timeEnd("[ReviewResponseHandler] insertActionables execution time");
      return results;
    } catch (error) {
      console.error(`[ReviewResponseHandler] Error inserting actionables for review ${reviewId}:`, error);
      throw new Error(`Failed to insert actionables: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private async insertRecommendations(reviewId: string, recommendations: ResponseOpenAITravelReviewAnalysis['recommendations']) {
    try {
      console.time("[ReviewResponseHandler] insertRecommendations execution time");
      console.log(`[ReviewResponseHandler] Inserting recommendations for review ${reviewId}...`);
      const results = await Promise.all(
        recommendations.map((recommendation) =>
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
      console.log(`[ReviewResponseHandler] ${results.length} recommendations inserted successfully for review ${reviewId}`);
      console.timeEnd("[ReviewResponseHandler] insertRecommendations execution time");
      return results;
    } catch (error) {
      console.error(`[ReviewResponseHandler] Error inserting recommendations for review ${reviewId}:`, error);
      throw new Error(`Failed to insert recommendations: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async handleResponse(
    review: ReviewData,
    analysis: ResponseOpenAITravelReviewAnalysis
  ): Promise<ResponseReviewInsert> {
    try {
      console.log("[ReviewResponseHandler] Starting review response handling...");

      // Step 1: Insert review and get reviewId
      const reviewId = await this.insertReview(review);

      // Step 2: Execute all database operations in parallel with timeout
      const [sentiment, actionables, recommendations] = await Promise.all([
        this.insertSentiment(reviewId, analysis.sentiment),
        this.insertActionables(reviewId, analysis.actionables),
        this.insertRecommendations(reviewId, analysis.recommendations)
      ]);

      // Step 3: Build and return response
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

      console.log("[ReviewResponseHandler] Review response handling completed successfully");
      return response;
    } catch (error) {
      console.error("[ReviewResponseHandler] Error in handleResponse:", error);
      throw new Error(
        `Failed to handle review response: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

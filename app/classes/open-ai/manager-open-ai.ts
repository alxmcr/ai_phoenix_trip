import { ReviewAIResponse } from "@/app/types/ai/review-ai-response";
import { ActionableData } from "@/app/types/db/actionable";
import { RecommendationData } from "@/app/types/db/recommendation";
import { ReviewData } from "@/app/types/db/review";
import { SentimentData } from "@/app/types/db/sentiment";
import { ActionableDB } from "../db/actionable-db";
import { RecommendationDB } from "../db/recommendation-db";
import { SentimentDB } from "../db/sentiment-db";
import { ValidationReview } from "../models/validation-review";

// helper classes for the database
const dbActionable = new ActionableDB();
const dbSentiment = new SentimentDB();
const dbRecommendation = new RecommendationDB();

export class ManagerOpenAI {
  // Build the prompt for the review
  static buildPrompt(review: ReviewData): string {
    return `
        Analyze the following travel review and provide insights:

        Trip Date: ${review.trip_date}
        Transport Mode: ${review.transport_mode}
        Company: ${review.company_name}
        Route: From ${review.origin} to ${review.destination}
        Rating: ${review.rating}/5
        Review: "${review.review_text}"

        Please analyze this review and return insights in **strict JSON format** with the following structure:

        1. **Sentiment analysis** — including:
          - score (float, from -1 to 1)
          - label ("positive", "neutral", or "negative")
          - summary (brief 1–2 sentence overview of sentiment)
          - emotion_tone (e.g. "frustration", "satisfaction", "disappointment", "joy")
          - aspect_sentiments (object showing sentiment score per aspect, e.g. { "punctuality": -0.9, "staff": -0.6 })
          - keywords (array of 2–5 key terms from the review)

        2. **Actionable insights** (2–3 items) — each with:
          - title
          - description
          - priority ("low", "medium", or "high")
          - department (e.g. "Customer Service", "Operations", "Cleaning", etc.)
          - category (e.g. "Service", "Communication", "Cleanliness", etc.)
          - source_aspect (the part of the review that triggered this insight)

        3. **Recommendations for improvement** (2–3 items) — each with:
          - title
          - description
          - impact ("low", "medium", or "high")
          - target_area (e.g. "Passenger Experience", "Onboard Cleanliness", etc.)
          - effort_level ("low", "medium", or "high")
          - data_driven (boolean indicating if it's based on clear review data)

        Return ONLY valid, minified JSON with the following structure:
        {
          "sentiment": {
            "score": number,
            "label": string,
            "summary": string,
            "emotion_tone": string,
            "aspect_sentiments": {
              "aspect": number
            },
            "keywords": [string]
          },
          "actionables": [
            {
              "title": string,
              "description": string,
              "priority": string,
              "department": string,
              "category": string,
              "source_aspect": string
            }
          ],
          "recommendations": [
            {
              "title": string,
              "description": string,
              "impact": string,
              "target_area": string,
              "effort_level": string,
              "data_driven": boolean
            }
          ]
        }

    `;
  }

  // Analyze the review
  static async analyzeReview(review: ReviewData): Promise<ReviewAIResponse> {
    try {
      // validate the review
      ValidationReview.validateInsertReview(review);

      // Analyze the review with OpenAI

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

      // Insert the actionables, sentiments and recommendations into the database
      const actionablesDB = await dbActionable.insertMany(actionables);
      const sentimentsDB = await dbSentiment.insertMany(sentiments);
      const recommendationsDB = await dbRecommendation.insertMany(
        recommendations
      );

      // Build the response
      const response: ReviewAIResponse = {
        review_id: review.review_id,
        actionables: actionablesDB,
        sentiments: sentimentsDB,
        recommendations: recommendationsDB,
      };

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
}

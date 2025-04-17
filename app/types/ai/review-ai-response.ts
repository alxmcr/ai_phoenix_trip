import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
import { ReviewData } from "../db/review";
import { SentimentData } from "../db/sentiment";

export type ReviewAIResponse = {
  review: ReviewData;
  actionables: Partial<ActionableData>[];
  sentiments: Partial<SentimentData>[];
  recommendations: Partial<RecommendationData>[];
};

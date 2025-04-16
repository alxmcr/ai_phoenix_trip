import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
import { SentimentData } from "../db/sentiment";

export type ReviewAIResponse = {
  review_id: string;
  actionables: Partial<ActionableData>[];
  sentiments: Partial<SentimentData>[];
  recommendations: Partial<RecommendationData>[];
};


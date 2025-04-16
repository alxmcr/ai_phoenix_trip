import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
import { SentimentData } from "../db/sentiment";

export type ReviewAIResponse = {
  review_id: string;
  actionable: Partial<ActionableData>[];
  sentiment: Partial<SentimentData>[];
  recommendation: Partial<RecommendationData>[];
};


import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
import { SentimentData } from "../db/sentiment";

export interface ReviewAIResponse {
  review_id: string;
  actionable: ActionableData[];
  sentiment: SentimentData[];
  recommendation: RecommendationData[];
}


import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
import { ReviewData } from "../db/review";
import { SentimentData } from "../db/sentiment";

export type ReviewAIResponse = {
  review: ReviewData;
  sentiment: SentimentData;
  actionables: ActionableData[];
  recommendations: RecommendationData[];
};

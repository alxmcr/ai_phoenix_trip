import { ResponseOpenAITravelReviewAnalysis } from "../ai/openai-response";
import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
import { ReviewData } from "../db/review";
import { SentimentData } from "../db/sentiment";

// Response for /reviews/:id
export type ResponseReviewGet = {
  review: ReviewData;
  sentiment: SentimentData;
  actionables: ActionableData[];
  recommendations: RecommendationData[];
};

// Response for /reviews/
export interface ResponseReviewInsert {
  review_id: string;
  analysis: ResponseOpenAITravelReviewAnalysis;
}

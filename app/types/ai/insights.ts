import { ActionableData } from "../db/actionable";
import { RecommendationData } from "../db/recommendation";
export interface InsightsAIData {
  sentiment_id: number;
  actionables: ActionableData[]; // List of actionable items
  recommendations: RecommendationData[]; // List of recommendations
}

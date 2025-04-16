export interface RecommendationData {
  recommendation_id: number;
  recommendation_text: string;
  review_id: number; // Foreign key to Review
}

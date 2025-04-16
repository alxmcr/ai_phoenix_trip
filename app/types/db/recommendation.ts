export interface RecommendationData {
  id: number;
  recommendation_text: string;
  review_id: number; // Foreign key to Review
}

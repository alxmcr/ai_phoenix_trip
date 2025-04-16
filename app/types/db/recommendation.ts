export interface RecommendationData {
  recommendation_id: string;
  recommendation_text: string;
  review_id: string; // Foreign key to Review
}

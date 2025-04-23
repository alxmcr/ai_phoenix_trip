export interface RecommendationData {
  recommendation_id: string;
  review_id: string; // Foreign key to Review
  data_driven: boolean;
  target_area: string;
  effort_level: string;
  title: string;
  description: string;
  impact: string;
  created_at: string;
  updated_at: string;
}

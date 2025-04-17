export interface ActionableData {
  actionable_id: string;
  review_id: string; // Foreign key to Review
  created_at: Date;
  updated_at: Date;
  priority: string;
  department: string;
  category: string;
  source_aspect: string;
  title: string;
  description: string;
}

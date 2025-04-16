export interface ActionableData {
  actionable_id: string;
  action_text: string;
  review_id: string; // Foreign key to Review
}

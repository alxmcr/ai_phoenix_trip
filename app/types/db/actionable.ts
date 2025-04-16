export interface ActionableData {
  actionable_id: number;
  action_text: string;
  review_id: number; // Foreign key to Review
}

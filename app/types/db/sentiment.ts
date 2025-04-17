export interface SentimentData {
  sentiment_id: string;
  review_id: string; // Foreign key to Review
  score: string;
  created_at: string;
  updated_at: string;
  emotion_tone: string;
  label: string;
  summary: string;
}

export interface SentimentData {
  sentiment_id: number;
  sentiment_text: string;
  review_id: number; // Foreign key to Review
}

export interface SentimentData {
  sentiment_id: string;
  sentiment_text: string;
  review_id: string; // Foreign key to Review
}

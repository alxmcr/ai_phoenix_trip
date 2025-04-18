export interface MetricsCurrent {
  totalReviews: number;
  averageRating: number;
  averageSentimentScore: number;
  totalActionables: number;
}

export interface MetricsPastMonth {
  totalReviewsInPastMonth: number;
  averageRatingInPastMonth: number;
  averageSentimentScoreInPastMonth: number;
  totalActionablesInPastMonth: number;
}

export interface Metrics {
  current: MetricsCurrent;
  pastMonth: MetricsPastMonth;
}

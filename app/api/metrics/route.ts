import { ActionableDB } from "@/app/classes/db/actionable-db";
import { ReviewDB } from "@/app/classes/db/review-db";
import { SentimentDB } from "@/app/classes/db/sentiment-db";
import { HTTPResponseCode } from "@/app/enums/http-response-code";
import { Metrics } from "@/app/types/metrics/metrics";

// Helpers database
const dbReview = new ReviewDB();
const dbSentiment = new SentimentDB();
const dbActionable = new ActionableDB();

export async function GET() {
  // get the total number of reviews
  const totalReviews = await dbReview.count();
  const totalReviewsInPastMonth = await dbReview.getCountOfReviewsInPastMonth();

  // get the average rating of the reviews
  const averageRating = await dbReview.getAverageRating();
  const averageRatingInPastMonth = await dbReview.getAverageRatingInPastMonth();

  // get the average sentiment score of the reviews
  const averageSentimentScore = await dbSentiment.getAverageSentimentScore();
  const averageSentimentScoreInPastMonth =
    await dbSentiment.getAverageSentimentScoreInPastMonth();

  // get the total number of actionables
  const totalActionables = await dbActionable.count();
  const totalActionablesInPastMonth =
    await dbActionable.getCountOfActionablesInPastMonth();

  // create the metrics object
  const metrics: Metrics = {
    current: {
      totalReviews,
      averageRating,
      averageSentimentScore,
      totalActionables,
    },
    pastMonth: {
      totalReviewsInPastMonth,
      averageRatingInPastMonth,
      averageSentimentScoreInPastMonth,
      totalActionablesInPastMonth,
    },
  };
  console.log("🚀 ~ GET ~ metrics:", metrics)

  // return Response
  return new Response(JSON.stringify(metrics), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

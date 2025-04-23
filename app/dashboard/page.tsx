import ActionableInsights from "@/components/sections/dashboard-page/actionables-section";
import MetricsSection from "@/components/sections/dashboard-page/metrics-section";
import RecentReviews from "@/components/sections/dashboard-page/recent-reviews";
import TopRecommendations from "@/components/sections/dashboard-page/top-recommendations-section";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { Suspense } from "react";
import { ActionableDB } from "../classes/db/actionable-db";
import { ReviewDB } from "../classes/db/review-db";
import { SentimentDB } from "../classes/db/sentiment-db";
import { Metrics } from "../types/metrics/metrics";

// Helpers database
const dbReview = new ReviewDB();
const dbSentiment = new SentimentDB();
const dbActionable = new ActionableDB();

async function getMetrics() {
  try {
    // get the total number of reviews
    const totalReviews = await dbReview.count();
    const totalReviewsInPastMonth =
      await dbReview.getCountOfReviewsInPastMonth();

    // get the average rating of the reviews
    const averageRating = await dbReview.getAverageRating();
    const averageRatingInPastMonth =
      await dbReview.getAverageRatingInPastMonth();

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

    return metrics;
  } catch (error) {
    throw error;
  }
}

export default async function DashboardPage() {
  let metrics: Metrics | null = null;

  try {
    metrics = await getMetrics();
  } catch (error) {
    console.log("🚀 ~ DashboardPage ~ error:", error);
  }

  if (!metrics) {
    return <div>Error loading metrics</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center w-full">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <MetricsSection metrics={metrics} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 container py-4">
          <ActionableInsights />
          <TopRecommendations />
        </div>
        <RecentReviews />
      </Suspense>
    </main>
  );
}

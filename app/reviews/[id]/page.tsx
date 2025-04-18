import { ReviewAIResponse } from "@/app/types/ai/review-ai-response";
import Footer from "@/components/sections/footer";
import { Hero } from "@/components/sections/review-page/hero";
import { InsightsTabs } from "@/components/sections/review-page/insights-tabs";
import { Sentiment } from "@/components/sections/review-page/sentiment-section";
import HeroSkeleton from "@/components/skeletons/hero-skeleton";
import InsightsSkeleton from "@/components/skeletons/insights-skeleton";
import { SentimentSkeleton } from "@/components/skeletons/sentiment-skeleton";
import { Suspense } from "react";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get id from params
  const { id } = await params;

  // Next.js API url by environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Endpoint to GET review data
  const endpoint = `${baseUrl}/api/reviews/${id}`;

  // Fetch to GET review data in content-type application/json
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // JSON response
  const reviewAnalyzed = (await res.json()) as ReviewAIResponse;

  return (
    <main className="flex flex-col min-h-screen items-center">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero review={reviewAnalyzed.review} />
      </Suspense>

      <Suspense fallback={<SentimentSkeleton />}>
        <Sentiment sentiment={reviewAnalyzed.sentiment} />
      </Suspense>

      <section className="mb-8 px-4 md:px-0 container">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Insights & Actions
        </h2>
        <Suspense fallback={<InsightsSkeleton />}>
          <InsightsTabs
            actionables={reviewAnalyzed.actionables}
            recommendations={reviewAnalyzed.recommendations}
          />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}

import { ReviewAIResponse } from "@/app/types/ai/review-ai-response";
import Footer from "@/components/sections/footer";
import { Hero } from "@/components/sections/review-page/hero";

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
      <Hero review={reviewAnalyzed.review} />
      <Footer />
    </main>
  );
}

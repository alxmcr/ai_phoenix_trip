import ActionableInsights from "@/components/sections/dashboard-page/actionables-section";
import MetricsSection from "@/components/sections/dashboard-page/metrics-section";
import TopRecommendations from "@/components/sections/dashboard-page/top-recommendations-section";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen items-center w-full">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <MetricsSection />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 container py-4">
          <ActionableInsights />
          <TopRecommendations />
        </div>
      </Suspense>
    </main>
  );
}

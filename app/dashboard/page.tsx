import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { Suspense } from "react";
import MetricsSection from "@/components/sections/dashboard-page/metrics-section";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen items-center w-full">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <MetricsSection />
      </Suspense>
    </main>
  );
}

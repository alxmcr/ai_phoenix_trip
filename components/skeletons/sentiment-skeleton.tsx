import { Skeleton } from "@/components/ui/skeleton";

export function SentimentSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg md:col-span-2" />
      </div>
    </div>
  );
}

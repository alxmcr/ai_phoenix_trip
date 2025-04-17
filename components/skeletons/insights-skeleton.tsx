import { Skeleton } from "@/components/ui/skeleton";

export default function InsightsSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-full mb-6 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </div>
  )
}
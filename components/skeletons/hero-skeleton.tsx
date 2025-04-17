import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

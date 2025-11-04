import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonQuestionItem() {
  return (
    <div className="h-[200px] w-full bg-accent/60 rounded-md flex items-center p-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center">
            <Skeleton className="size-8 rounded-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-1 h-6 w-30 rounded-md" />
            <Skeleton className="h-6 w-40 rounded-md" />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center">
            <Skeleton className="size-8 rounded-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-1 h-6 w-52 rounded-md" />
            <Skeleton className="h-6 w-70 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

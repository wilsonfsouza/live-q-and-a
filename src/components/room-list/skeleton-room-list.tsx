import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonRoomList() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-[94px] w-full rounded-md" />
      <Skeleton className="h-[94px] w-full rounded-md" />
      <Skeleton className="h-[94px] w-full rounded-md" />
      <Skeleton className="h-[94px] w-full rounded-md" />
      <Skeleton className="h-[94px] w-full rounded-md" />
    </div>
  );
}

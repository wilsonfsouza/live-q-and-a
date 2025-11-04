import { Badge } from "@/components/ui/badge";
import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactQueryErrorPlaceholder } from "../error";
import { SkeletonRoomList } from "./skeleton-room-list";

export const RoomList = () => {
  const { data, isLoading, error } = useRooms();
  const [parent] = useAutoAnimate({
    disrespectUserMotionPreference: false,
  });

  if (error) {
    return (
      <div ref={parent}>
        <ReactQueryErrorPlaceholder error={error} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3" ref={parent}>
        {isLoading && <SkeletonRoomList />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" ref={parent}>
      {data?.results.map((room) => (
        <Link
          className="flex items-center justify-between transition-colors bg-card border-l-2 border-r-2 rounded-md py-4 px-6 hover:border-primary hover:bg-accent"
          key={room.id}
          to={`/room/${room.id}`}
        >
          <div className="flex flex-1 flex-col gap-3">
            <h3 className="font-medium">{room.name}</h3>

            <div className="flex items-center gap-2 mb-1">
              <Badge className="text-xs" variant="outline">
                {dayjs(room.createdAt).fromNow()}
              </Badge>

              <Badge className="text-xs" variant="secondary">
                {room.questionsCount} question(s)
              </Badge>
            </div>
          </div>

          <span className="flex items-center gap-1 text-sm">
            <span className="hidden sm:block">Join</span>

            <ArrowRight className="size-3" />
          </span>
        </Link>
      ))}
    </div>
  );
};

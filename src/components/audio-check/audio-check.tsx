import { useRoomAudioCheck } from "@/http/use-room-audio-check";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface AudioCheckProps {
  roomId: string;
}
export const AudioCheck = ({ roomId }: AudioCheckProps) => {
  const { data, isLoading, error } = useRoomAudioCheck(roomId);

  if (error) {
    return (
      <Badge className="text-xs" variant="destructive">
        <AlertTriangle className="size-4" />
        <span className="hidden md:block">Unable to verify audio</span>
        <span className="block md:hidden">Audio Check</span>
      </Badge>
    );
  }
  if (isLoading) {
    return (
      <Badge className="text-xs" variant="outline">
        <Loader2 className="size-4 animate-spin" />
        Checking audio
      </Badge>
    );
  }

  return (
    <>
      {data?.hasAudioRecorded && (
        <Badge className="text-xs" variant="outline">
          <Check className="size-4" />
          Has Audio
        </Badge>
      )}

      {!data?.hasAudioRecorded && (
        <Badge className="text-xs" variant="destructive">
          <AlertTriangle className="size-4" />
          Needs audio
        </Badge>
      )}
    </>
  );
};

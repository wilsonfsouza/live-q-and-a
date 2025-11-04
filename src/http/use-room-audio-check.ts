import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomAudioCheckResponse } from "./types/get-room-audio-check";

export const useRoomAudioCheck = (roomId: string) => {
  return useQuery({
    queryKey: ["get-room", "audio", roomId],
    queryFn: async () => {
      const response = await fetch(
        `${env.VITE_APP_API_URL}/rooms/${roomId}/audio`
      );
      const result: GetRoomAudioCheckResponse = await response.json();

      return result;
    },
  });
};

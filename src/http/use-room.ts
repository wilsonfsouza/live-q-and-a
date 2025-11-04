import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomResponse } from "./types/get-room-response";

export const useRoom = (roomId: string) => {
  return useQuery({
    queryKey: ["get-room", roomId],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_APP_API_URL}/rooms/${roomId}`);
      const result: GetRoomResponse = await response.json();

      return result;
    },
  });
};

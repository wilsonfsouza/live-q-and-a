import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-response";

export const useRooms = () => {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_APP_API_URL}/rooms`);
      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });
};

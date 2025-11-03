import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoomPage } from "./pages/create-room";
import { RoomPage } from "./pages/room";
import { RoomsListPage } from "./pages/rooms-list";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RoomsListPage />} index />
          <Route element={<RoomPage />} path="/room/:roomId" />
          <Route element={<CreateRoomPage />} path="/room/create" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

import { CreateRoomForm } from "@/components/create-room-form";
import { Header } from "@/components/header/header";
import { RoomList } from "@/components/room-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function RoomsListPage() {
  return (
    <>
      <Header>
        <Button variant="secondary" className="flex items-center gap-2" asChild>
          <Link to="/create-room">
            <Plus className="h-5 w-5" />
            Create room
          </Link>
        </Button>
      </Header>

      <section className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid-col-1 grid items-start gap-8">
            <CreateRoomForm />

            <RoomList />
          </div>
        </div>
      </section>
    </>
  );
}

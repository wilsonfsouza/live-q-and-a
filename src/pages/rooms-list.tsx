import { Header } from "@/components/header";
import { RoomList } from "@/components/room-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function RoomsListPage() {
  return (
    <>
      <Header>
        <Button variant="secondary" className="flex items-center gap-2" asChild>
          <Link to="/room/create">
            <Plus className="h-5 w-5" />
            Create room
          </Link>
        </Button>
      </Header>

      <section className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 font-bold text-3xl text-foreground">
              Recent rooms
            </h1>
            <p className="text-muted-foreground">
              Shortcuts to the most recent rooms created.
            </p>
          </div>

          <RoomList />
        </div>
      </section>
    </>
  );
}

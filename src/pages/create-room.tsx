import { CreateRoomForm } from "@/components/create-room-form";
import { Header } from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export function CreateRoomPage() {
  return (
    <section className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-action-sm">
                  <Link to="/">Forum</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-action-sm text-primary">Create room</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div>
            <h1 className="mb-2 font-bold text-3xl text-foreground">
              Create a room
            </h1>
            <p className="text-muted-foreground">
              Create a new room to start making questions and receiving
              questions from our AI Agent.
            </p>
          </div>

          <CreateRoomForm />
        </div>
      </div>
    </section>
  );
}

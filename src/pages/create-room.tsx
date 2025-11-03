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
    <>
      <Header />

      <section className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid-col-1 grid items-start gap-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="text-action-sm">
                    <Link to="/">Forum</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-action-sm text-primary">
                    Create room
                  </span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <CreateRoomForm />
          </div>
        </div>
      </section>
    </>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cat } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const isCreateRoomPage = pathname === "/room/create";

  return (
    <header className="border-b border-border bg-sidebar">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {(!isHomePage || isCreateRoomPage) && (
            <Button variant="outline" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Link to="/" className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <Cat className="size-4 text-secondary-foreground" />
              </div>
            </div>

            <span className="text-xl font-bold hidden md:block">
              KITTY ASSISTANT
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {children}

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

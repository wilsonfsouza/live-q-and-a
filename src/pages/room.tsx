import { Header } from "@/components/header";
import { QuestionForm } from "@/components/question-form";
import { QuestionList } from "@/components/question-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRecordRoomAudio } from "@/hooks/use-record-room";
import { useRoom } from "@/http/use-room";
import { cn } from "@/lib/utils";
import { Mic, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

type RoomParams = {
  roomId: string;
};

export function RoomPage() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const { data } = useRoom(params.roomId);

  const { isRecording, startRecording, stopRecording } = useRecordRoomAudio(
    params.roomId
  );

  return (
    <section className="min-h-screen">
      <Header>
        <>
          {isRecording && (
            <Button
              className="flex items-center gap-2 cursor-pointer"
              variant="secondary"
              onClick={stopRecording}
            >
              <Mic className="size-4 animate-pulse" />
              Pause recording
            </Button>
          )}

          {!isRecording && (
            <Button
              className="flex items-center gap-2 cursor-pointer"
              variant="secondary"
              onClick={startRecording}
            >
              <Radio className="size-4" />
              Record audio
            </Button>
          )}
        </>
      </Header>

      <div className="container mx-auto px-4 py-8">
        <div className={cn("mb-8", !!data?.description ? "mb-4" : "")}>
          <div className="mb-4 flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="text-action-sm">
                    <Link to="/">Forum</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-action-sm text-primary">Room</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Q&A Room{data?.name && `: ${data.name}`}
          </h1>
          <p className="text-muted-foreground">
            Write questions and receive answers from our AI assistant based on
            the audio recorded.
          </p>
        </div>

        {data?.description && (
          <div className="mb-8">
            <h2 className="mb-2 font-semibold text-2xl text-foreground">
              Description
            </h2>
            <p className="text-muted-foreground">{data?.description}</p>
          </div>
        )}

        <div className="mb-8">
          <QuestionForm roomId={params.roomId} />
        </div>

        <QuestionList roomId={params.roomId} />
      </div>
    </section>
  );
}

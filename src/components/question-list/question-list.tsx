import { useRoomQuestions } from "@/http/use-room-questions";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Inbox } from "lucide-react";
import { ReactQueryErrorPlaceholder } from "../error";
import { QuestionItem } from "../question-item";
import { SkeletonQuestionList } from "./skeleton-question-list";

interface QuestionListProps {
  roomId: string;
}

export const QuestionList = ({ roomId }: QuestionListProps) => {
  const { data, isLoading, error } = useRoomQuestions(roomId);
  const [parent] = useAutoAnimate({
    disrespectUserMotionPreference: false,
  });

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl text-foreground">
            Questions & Answers
          </h2>
        </div>

        <div ref={parent}>
          <ReactQueryErrorPlaceholder error={error} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl text-foreground">
            Questions & Answers
          </h2>
        </div>

        <div className="space-y-6" ref={parent}>
          <SkeletonQuestionList />
        </div>
      </div>
    );
  }

  const hasQuestions = !!data && data?.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Questions & Answers
        </h2>
      </div>

      <div className="space-y-6" ref={parent}>
        {hasQuestions &&
          data?.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}

        {!hasQuestions && (
          <div className="container">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-8 md:p-12">
              <Inbox className="h-12 w-12 text-primary" />

              <p className="text-center text-body-md text-gray-100">
                No questions were found. You can write the first!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

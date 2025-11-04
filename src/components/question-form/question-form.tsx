import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/http/use-create-question";
import { useRoomAudioCheck } from "@/http/use-room-audio-check";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Question is required")
    .min(10, "Question must have at least 10 characters")
    .max(500, "Question must have less than 500 characters"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);
  const { data, isLoading } = useRoomAudioCheck(roomId);

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  const { isSubmitting } = form.formState;

  const isAudioAvailable = !isLoading && !!data?.hasAudioRecorded;
  const isFormDisabled = !isAudioAvailable || isSubmitting;

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    await createQuestion(data);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructions:</CardTitle>
        <CardDescription>
          <ul className="pl-4 list-disc">
            <li>
              You <b className="text-destructive">cannot</b> create a question{" "}
              <b className="text-destructive">without</b> a{" "}
              <b className="text-primary">recorded audio</b>.
            </li>
            <li>
              Your questions <b className="text-primary">will</b> be answered by
              the AI assistant once the{" "}
              <b className="text-primary">audio is available</b>.
            </li>
            <li>
              Audio availability is{" "}
              <b className="text-primary">displayed on the header</b> next to{" "}
              <i>"Record audio"</i> button.
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
      <hr />
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Ask your question:</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      disabled={isFormDisabled}
                      placeholder="What would you like to know?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center md:justify-end">
              <Button
                disabled={isFormDisabled}
                type="submit"
                className="w-full md:w-fit"
              >
                Send question
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

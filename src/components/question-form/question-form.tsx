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

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    await createQuestion(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage notes:</CardTitle>
        <CardDescription>
          <ul className="pl-4 list-disc">
            <li>
              {" "}
              Only rooms <b className="text-primary">
                with recorded audio
              </b>{" "}
              will be answered by Kitty AI assistant.
            </li>
            <li>
              Questions made <b className="text-primary">before</b> audio was
              recorded are <b className="text-destructive">not</b> retroactively
              answered.
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
                      disabled={isSubmitting}
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
                disabled={isSubmitting}
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

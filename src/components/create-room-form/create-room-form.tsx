import { useCreateRoom } from "@/http/use-create-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod/v4";
import { DiscardModal } from "../modal";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormTooltip } from "./form-tooltip";
import { tooltipContent } from "./tooltip-content";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: "Include at least 3 characters" }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export const CreateRoomForm = () => {
  const navigate = useNavigate();
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [activeField, setActiveField] = useState<string | null>("name");
  const [tooltipPosition, setTooltipPosition] = useState(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const getFieldRef = (field: string) => {
    switch (field) {
      case "name":
        return nameRef;
      case "description":
        return descriptionRef;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (
      activeField &&
      typeof window !== "undefined" &&
      window.innerWidth >= 960
    ) {
      const ref = getFieldRef(activeField);
      const container = formContainerRef.current;
      if (ref?.current && container) {
        const fieldRect = ref.current.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeTop = fieldRect.top - containerRect.top;
        setTooltipPosition(relativeTop);
      }
    }
  }, [activeField]);

  const handleDiscard = () => {
    setShowDiscardModal(true);
  };

  const handleConfirmDiscard = () => {
    navigate("/");
  };

  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({
      name,
      description,
    });
    createRoomForm.reset();
    navigate("/");
  }

  return (
    <>
      <div className="relative" ref={formContainerRef}>
        <div className="lg:pr-[440px]">
          <Card>
            <CardContent>
              <Form {...createRoomForm}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
                >
                  <FormField
                    control={createRoomForm.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="mb-1">Room name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              ref={nameRef}
                              onFocus={() => setActiveField("name")}
                              placeholder="Type the room name..."
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={createRoomForm.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="mb-1">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              onFocus={() => setActiveField("description")}
                              ref={descriptionRef}
                              placeholder="What is this about? (optional)"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-4">
                    <Button
                      variant="secondary"
                      type="button"
                      className="w-full md:w-fit"
                      onClick={handleDiscard}
                    >
                      Discard
                    </Button>
                    <Button
                      variant="default"
                      type="submit"
                      className="w-full md:w-fit"
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <FormTooltip
            activeField={activeField}
            tooltipPosition={tooltipPosition}
            content={tooltipContent}
          />
        </div>
      </div>

      <DiscardModal
        open={showDiscardModal}
        onOpenChange={setShowDiscardModal}
        onConfirm={handleConfirmDiscard}
      />
    </>
  );
};

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DiscardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DiscardModal({
  open,
  onOpenChange,
  onConfirm,
}: DiscardModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-xl">Discard room</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-4">
            Are you sure you wish to discard all the content for this room?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 mt-6">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            No
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

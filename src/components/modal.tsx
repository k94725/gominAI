import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface ModalProps {
  title?: string;
  content: string;
  open: boolean;
  onOpenChange: (show: boolean) => void;
  onClickCancel: () => void;
  onClickConfirm: () => void;
}

export function Modal({
  title = "알림",
  content,
  open,
  onOpenChange,
  onClickCancel,
  onClickConfirm,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-neutral-900">
            {title}
          </DialogTitle>
          <DialogDescription
            className="mt-6 text-base text-neutral-500"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </DialogHeader>
        <DialogFooter className="flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            size="full"
            onClick={onClickCancel}
            className="shadow-none text-themeColor-violet border-themeColor-violet hover:bg-themeColor-violet/20 hover:text-themeColor-violet"
          >
            취소
          </Button>
          <Button size="full" onClick={onClickConfirm} className="shadow-none">
            변경
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

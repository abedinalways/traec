"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ActionDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

export function ActionDialog({
  open,
  setOpen,
  icon,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
}: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-8 max-w-[384px]! rounded-2xl">
        <div className="flex flex-col items-center text-center">
          {/* Icon Holder */}
          <div className="w-16 h-16 rounded-full border-3 border-red-200 flex items-center justify-center mb-4">
            {icon}
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mb-1">{title}</h2>

          <p className="text-gray-500 text-[16px] mb-6">{description}</p>

          <DialogFooter className="flex w-full justify-center! gap-4">
            <Button
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-8 py-6 rounded-lg"
              onClick={() => {
                onConfirm?.();
                setOpen(false);
              }}
            >
              {confirmLabel}
            </Button>

            <Button
              variant="outline"
              className="px-8 py-6 cursor-pointer rounded-lg"
              onClick={() => setOpen(false)}
            >
              {cancelLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

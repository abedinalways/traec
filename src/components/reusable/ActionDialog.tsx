"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IActionDialogProps {
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
}: IActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-8 max-w-[384px]! rounded-2xl font-[inter]">
        <div className="flex flex-col items-center text-center">
          {/* Icon Holder */}
          <div className="w-16 h-16 rounded-full border-3 border-red-200 flex items-center justify-center mb-4">
            {icon}
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mb-1">{title}</h2>

          <p className="text-gray-500 text-[16px] mb-6">{description}</p>

          <DialogFooter className="flex  w-full items-center justify-center gap-4">
            <button
              className="bg-[#e9201d]  cursor-pointer text-white rounded-[16px]! shape-squircle! w-[154px] h-[56px]"
              onClick={() => {
                onConfirm?.();
                setOpen(false);
              }}
            >
              {confirmLabel}
            </button>

            <Button
              variant="outline"
              className="shape-squircle! rounded-[16px]! w-[154px] h-[56px] cursor-pointer  border border-[#3d4566]"
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

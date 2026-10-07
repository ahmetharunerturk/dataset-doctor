"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "sheet-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  closeLabel,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  closeLabel: string;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "sheet-panel fixed inset-y-0 end-0 z-50 flex w-[min(360px,92vw)] flex-col overflow-y-auto border-s border-line bg-background px-6 py-5",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          aria-label={closeLabel}
          className="absolute top-4 end-4 grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-panel hover:text-foreground"
        >
          <X className="size-4" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
};

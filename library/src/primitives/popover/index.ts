import { PopoverRoot } from "./popover-root";
import { PopoverTrigger } from "./popover-trigger";
import { PopoverPortal } from "./popover-portal";
import { PopoverOverlay } from "./popover-overlay";
import { PopoverContent } from "./popover-content";
import { PopoverClose } from "./popover-close";

export const PopoverPrimitive = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Overlay: PopoverOverlay,
  Content: PopoverContent,
  Close: PopoverClose,
};

export type { PopoverRootProps } from "./popover-root";
export type { PopoverTriggerProps, PopoverTriggerRef } from "./popover-trigger";
export type { PopoverPortalProps } from "./popover-portal";
export type { PopoverOverlayProps } from "./popover-overlay";
export type { PopoverContentProps } from "./popover-content";
export type { PopoverCloseProps } from "./popover-close";
export type { PopoverContext } from "./context";
export { usePopover } from "./context";

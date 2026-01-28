import { PopoverClose } from "./components/popover-close";
import { PopoverContent } from "./components/popover-content";
import { PopoverOverlay } from "./components/popover-overlay";
import { PopoverPortal } from "./components/popover-portal";
import { PopoverRoot } from "./components/popover-root";
import { PopoverTrigger } from "./components/popover-trigger";

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Overlay: PopoverOverlay,
  Content: PopoverContent,
  Close: PopoverClose,
};

export type { PopoverCloseProps } from "./components/popover-close";
export type { PopoverContentProps } from "./components/popover-content";
export type { PopoverOverlayProps } from "./components/popover-overlay";
export type { PopoverPortalProps } from "./components/popover-portal";
export type { PopoverRootProps } from "./components/popover-root";
export type { PopoverTriggerProps, PopoverTriggerRef } from "./components/popover-trigger";
export { usePopover } from "./context";
export type { PopoverContext } from "./context";

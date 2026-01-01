import type { PopoverContentProps } from "./popover-content";
import type { PopoverOverlayProps } from "./popover-overlay";

export interface PopoverStyles {
  overlay?: PopoverOverlayProps["style"];
  content?: PopoverContentProps["style"];
}

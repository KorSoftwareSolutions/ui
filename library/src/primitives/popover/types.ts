import { PopoverContentProps } from "./popover-content";
import { PopoverOverlayProps } from "./popover-overlay";

export interface PopoverStyles {
  overlay?: PopoverOverlayProps["style"];
  content?: PopoverContentProps["style"];
}

import type { PopoverContentProps } from "./components/popover-content";
import type { PopoverOverlayProps } from "./components/popover-overlay";

export interface PopoverStyles {
  overlay?: PopoverOverlayProps["style"];
  content?: PopoverContentProps["style"];
}

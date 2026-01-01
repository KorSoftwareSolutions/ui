import type { DropdownMenuButtonProps } from "./dropdown-menu-button";
import type { DropdownMenuContentProps } from "./dropdown-menu-content";
import type { DropdownMenuDividerProps } from "./dropdown-menu-divider";
import type { DropdownMenuOverlayProps } from "./dropdown-menu-overlay";

export type DropdownMenuButtonState = "default" | "hovered";

export interface DropdownMenuStyles {
  content?: DropdownMenuContentProps["style"];
  button?: Partial<Record<DropdownMenuButtonState, DropdownMenuButtonProps["style"]>>;
  divider?: DropdownMenuDividerProps["style"];
  overlay?: DropdownMenuOverlayProps["style"];
}

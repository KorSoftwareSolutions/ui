import { DropdownMenuContentProps } from "./dropdown-menu-content";
import { DropdownMenuButtonProps } from "./dropdown-menu-button";
import { DropdownMenuDividerProps } from "./dropdown-menu-divider";
import { DropdownMenuOverlayProps } from "./dropdown-menu-overlay";

export type DropdownMenuButtonState = "default" | "hovered";

export interface DropdownMenuStyles {
  content?: DropdownMenuContentProps["style"];
  button?: Partial<Record<DropdownMenuButtonState, DropdownMenuButtonProps["style"]>>;
  divider?: DropdownMenuDividerProps["style"];
  overlay?: DropdownMenuOverlayProps["style"];
}

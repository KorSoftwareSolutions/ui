import { DropdownMenuRoot } from "./dropdown-menu-root";
import { DropdownMenuTrigger } from "./dropdown-menu-trigger";
import { DropdownMenuContent } from "./dropdown-menu-content";
import { DropdownMenuButton } from "./dropdown-menu-button";
import { DropdownMenuDivider } from "./dropdown-menu-divider";
import { DropdownMenuPortal } from "./dropdown-menu-portal";
import { DropdownMenuOverlay } from "./dropdown-menu-overlay";

export const DropdownMenuPrimitive = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Overlay: DropdownMenuOverlay,
  Content: DropdownMenuContent,
  Button: DropdownMenuButton,
  Divider: DropdownMenuDivider,
};

export type { DropdownMenuRootProps } from "./dropdown-menu-root";
export type { DropdownMenuTriggerProps } from "./dropdown-menu-trigger";
export type { DropdownMenuPortalProps } from "./dropdown-menu-portal";
export type { DropdownMenuOverlayProps } from "./dropdown-menu-overlay";
export type { DropdownMenuContentProps } from "./dropdown-menu-content";
export type { DropdownMenuButtonProps } from "./dropdown-menu-button";
export type { DropdownMenuDividerProps } from "./dropdown-menu-divider";
export type { DropdownMenuStyles } from "./types";

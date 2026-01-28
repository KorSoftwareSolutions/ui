import { MenuContent } from "./components/menu-content";
import { MenuItem } from "./components/menu-item";
import { MenuOverlay } from "./components/menu-overlay";
import { MenuPortal } from "./components/menu-portal";
import { MenuRoot } from "./components/menu-root";
import { MenuTrigger } from "./components/menu-trigger";

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Overlay: MenuOverlay,
  Content: MenuContent,
  Item: MenuItem,
};

export type { MenuContentProps } from "./components/menu-content";
export type { MenuItemProps } from "./components/menu-item";
export type { MenuOverlayProps } from "./components/menu-overlay";
export type { MenuPortalProps } from "./components/menu-portal";
export type { MenuRootProps } from "./components/menu-root";
export type { MenuTriggerProps } from "./components/menu-trigger";
export type { MenuStyles } from "./types";

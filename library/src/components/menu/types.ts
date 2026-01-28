import type { MenuContentProps } from "./components/menu-content";
import type { MenuItemProps } from "./components/menu-item";
import type { MenuOverlayProps } from "./components/menu-overlay";

export type MenuButtonState = "default" | "hovered";

export interface MenuStyles {
  content?: MenuContentProps["style"];
  item?: Partial<Record<MenuButtonState, MenuItemProps["style"]>>;
  overlay?: MenuOverlayProps["style"];
}

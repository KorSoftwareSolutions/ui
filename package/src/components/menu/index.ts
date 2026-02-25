import { MenuCheckboxItem } from "./components/menu-checkbox-item";
import { MenuContent } from "./components/menu-content";
import { MenuItem } from "./components/menu-item";
import { MenuLabel } from "./components/menu-label";
import { MenuOverlay } from "./components/menu-overlay";
import { MenuPortal } from "./components/menu-portal";
import { MenuRadioGroup } from "./components/menu-radio-group";
import { MenuRadioItem } from "./components/menu-radio-item";
import { MenuRoot } from "./components/menu-root";
import { MenuShortcut } from "./components/menu-shortcut";
import { MenuTrigger } from "./components/menu-trigger";

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Overlay: MenuOverlay,
  Content: MenuContent,
  Item: MenuItem,
  Label: MenuLabel,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Shortcut: MenuShortcut,
};

export type { MenuCheckboxItemProps } from "./components/menu-checkbox-item";
export type { MenuContentProps } from "./components/menu-content";
export type { MenuItemProps } from "./components/menu-item";
export type { MenuLabelProps } from "./components/menu-label";
export type { MenuOverlayProps } from "./components/menu-overlay";
export type { MenuPortalProps } from "./components/menu-portal";
export type { MenuRadioGroupProps } from "./components/menu-radio-group";
export type { MenuRadioItemProps } from "./components/menu-radio-item";
export type { MenuRootProps } from "./components/menu-root";
export type { MenuShortcutProps } from "./components/menu-shortcut";
export type { MenuTriggerProps } from "./components/menu-trigger";
export type { MenuStyles } from "./types";

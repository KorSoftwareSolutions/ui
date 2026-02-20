import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { SvgProps } from "../../types/props.types";
import type { IconProps } from "../icon";
import type { MenuContentProps } from "./components/menu-content";
import type { MenuOverlayProps } from "./components/menu-overlay";

export type MenuButtonState = "default" | "hovered";
export type MenuCheckboxItemState = "default" | "hovered" | "disabled";
export type MenuRadioItemState =
  | "default"
  | "hovered"
  | "selected"
  | "disabled";

export interface MenuStyles {
  content?: MenuContentProps["style"];
  item?: Partial<Record<MenuButtonState, StyleProp<ViewStyle>>>;
  itemText?: StyleProp<TextStyle>;
  itemIcon?: IconProps;
  overlay?: MenuOverlayProps["style"];

  group?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  separator?: StyleProp<ViewStyle>;
  checkboxItem?: Partial<Record<MenuCheckboxItemState, StyleProp<ViewStyle>>>;
  selectionIndicator?: TextStyle & SvgProps;
  radioGroup?: StyleProp<ViewStyle>;
  radioItem?: Partial<Record<MenuRadioItemState, StyleProp<ViewStyle>>>;
  shortcut?: StyleProp<TextStyle>;
}

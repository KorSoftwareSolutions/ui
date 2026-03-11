import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { IconProps } from "../icon";

export type SidebarState = "expanded" | "collapsed";

export type SidebarMenuButtonState = "default" | "active" | "hovered";

export interface SidebarStyles {
  /** The sidebar container */
  root?: StyleProp<ViewStyle>;
  /** Header (sticky top) */
  header?: StyleProp<ViewStyle>;
  /** Footer (sticky bottom) */
  footer?: StyleProp<ViewStyle>;
  /** Scrollable content area */
  content?: StyleProp<ViewStyle>;
  /** Group container */
  group?: StyleProp<ViewStyle>;
  /** Group label text */
  groupLabel?: StyleProp<TextStyle>;
  /** Menu list container */
  menu?: StyleProp<ViewStyle>;
  /** Menu item */
  menuItem?: Partial<Record<SidebarMenuButtonState, StyleProp<ViewStyle>>>;
  /** Menu item text */
  menuItemText?: Partial<Record<SidebarMenuButtonState, StyleProp<TextStyle>>>;
  /** Menu item icon */
  menuItemIcon?: Partial<Record<SidebarMenuButtonState, IconProps>>;
  /** Submenu container */
  menuSub?: StyleProp<ViewStyle>;
}

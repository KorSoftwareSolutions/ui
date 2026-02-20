import type { StyleProp, TextStyle } from "react-native";
import type { IconProps } from "../icon";
import type { TabsItemProps } from "./components/tabs-item";
import type { TabsRootProps } from "./components/tabs-root";

export type TabsItemState = "default" | "active" | "disabled" | "hovered";

export interface TabsStyles {
  root?: TabsRootProps["style"];
  item?: Partial<Record<TabsItemState, TabsItemProps["style"]>>;
  itemText?: Partial<Record<TabsItemState, StyleProp<TextStyle>>>;
  itemIcon?: Partial<Record<TabsItemState, IconProps>>;
}

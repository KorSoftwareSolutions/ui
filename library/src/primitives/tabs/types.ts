import type { StyleProp, TextStyle } from "react-native";
import type { TabsListProps } from "./components/tabs-list";
import type { TabsTriggerProps } from "./components/tabs-trigger";

export type TabsState = "default" | "active" | "disabled";

export interface TabsStyles {
  root?: TabsListProps["style"];
  list?: TabsListProps["style"];
  trigger?: Partial<Record<TabsState, TabsTriggerProps["style"]>>;
  triggerText?: Partial<Record<TabsState, StyleProp<TextStyle>>>;
}

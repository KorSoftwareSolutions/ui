import type { StyleProp, TextStyle } from "react-native";
import type { TabsPrimitiveListProps } from "./tabs-list";
import type { TabsPrimitiveTriggerProps } from "./tabs-trigger";

export type TabsState = "default" | "active" | "disabled";

export interface TabsStyles {
  root?: TabsPrimitiveListProps["style"];
  list?: TabsPrimitiveListProps["style"];
  trigger?: Partial<Record<TabsState, TabsPrimitiveTriggerProps["style"]>>;
  triggerText?: Partial<Record<TabsState, StyleProp<TextStyle>>>;
}

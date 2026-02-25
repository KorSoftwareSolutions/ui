import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export type RadioGroupState = "default" | "disabled";
export type RadioItemState = "default" | "selected" | "disabled" | "hovered";

export interface RadioGroupStyles {
  root?: Partial<Record<RadioGroupState, StyleProp<ViewStyle>>>;
  item?: Partial<Record<RadioItemState, StyleProp<ViewStyle>>>;
  indicator?: Partial<Record<RadioItemState, StyleProp<ViewStyle>>>;
  dot?: Partial<Record<RadioItemState, StyleProp<ViewStyle>>>;
  content?: Partial<Record<RadioItemState, StyleProp<ViewStyle>>>;
  title?: Partial<Record<RadioItemState, StyleProp<TextStyle>>>;
  description?: Partial<Record<RadioItemState, StyleProp<TextStyle>>>;
}

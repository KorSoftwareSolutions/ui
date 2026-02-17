import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export type CheckboxState = "default" | "checked" | "disabled" | "hovered";

export interface CheckboxStyles {
  root?: Partial<Record<CheckboxState, StyleProp<ViewStyle>>>;
  indicator?: Partial<Record<CheckboxState, StyleProp<ViewStyle>>>;
  checkmark?: Partial<Record<CheckboxState, StyleProp<TextStyle>>>;
  content?: Partial<Record<CheckboxState, StyleProp<ViewStyle>>>;
  title?: Partial<Record<CheckboxState, StyleProp<TextStyle>>>;
  description?: Partial<Record<CheckboxState, StyleProp<TextStyle>>>;
}

import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import type { ComboboxContentProps } from "./components/combobox-content";
import type { ComboboxOverlayProps } from "./components/combobox-overlay";

export type ComboboxState = "default" | "disabled";
export type ComboboxTriggerState = ComboboxState | "focused";
export type ComboboxOptionState = ComboboxState | "hovered" | "selected";

export interface ComboboxStyles {
  root?: Partial<Record<ComboboxState, StyleProp<ViewStyle>>>;
  trigger?: Partial<Record<ComboboxTriggerState, TextInputProps>>;
  overlay?: Partial<Record<ComboboxState, ComboboxOverlayProps["style"]>>;
  content?: Partial<Record<ComboboxState, ComboboxContentProps["style"]>>;
  option?: Partial<Record<ComboboxOptionState, TextStyle>>;
  empty?: Partial<Record<ComboboxState, TextStyle>>;
}

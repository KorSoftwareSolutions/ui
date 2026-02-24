import type { TextInputProps, TextStyle } from "react-native";
import type { ComboboxContentProps } from "./components/combobox-content";
import type { ComboboxOverlayProps } from "./components/combobox-overlay";
import type { ComboboxRootProps } from "./components/combobox-root";

export type ComboboxState = "default" | "disabled";
export type ComboboxTriggerState = ComboboxState | "focused";
export type ComboboxOptionState = ComboboxState | "hovered" | "selected";

export interface ComboboxStyles {
  root?: Partial<Record<ComboboxState, ComboboxRootProps["style"]>>;
  trigger?: Partial<Record<ComboboxTriggerState, TextInputProps>>;
  overlay?: Partial<Record<ComboboxState, ComboboxOverlayProps["style"]>>;
  content?: Partial<Record<ComboboxState, ComboboxContentProps["style"]>>;
  option?: Partial<Record<ComboboxOptionState, TextStyle>>;
  empty?: Partial<Record<ComboboxState, TextStyle>>;
}

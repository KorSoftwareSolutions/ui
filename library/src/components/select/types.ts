import type { TextStyle } from "react-native";
import type { SelectContentProps } from "./components/select-content";
import type { SelectOverlayProps } from "./components/select-overlay";
import type { SelectRootProps } from "./components/select-root";
import type { SelectTriggerProps, SelectValueProps } from "./components/select-trigger";

export type SelectState = "default" | "disabled";
export type SelectOptionState = SelectState | "hovered" | "selected";

export interface SelectStyles {
  root?: Partial<Record<SelectState, SelectRootProps["style"]>>;
  trigger?: Partial<Record<SelectState, SelectTriggerProps["style"]>>;
  value?: Partial<Record<SelectState, SelectValueProps["style"]>>;
  placeholder?: Partial<Record<SelectState, SelectValueProps["style"]>>;
  overlay?: Partial<Record<SelectState, SelectOverlayProps["style"]>>;
  content?: Partial<Record<SelectState, SelectContentProps["style"]>>;
  option?: Partial<Record<SelectOptionState, TextStyle>>;
}

export interface SelectOption {
  value: string;
  label: React.ReactNode;
}

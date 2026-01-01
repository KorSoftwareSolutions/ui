import type { SelectContentProps } from "./select-content";
import type { SelectOptionProps } from "./select-option";
import type { SelectOverlayProps } from "./select-overlay";
import type { SelectRootProps } from "./select-root";
import type { SelectTriggerProps } from "./select-trigger";
import type { SelectValueProps } from "./select-value";

export type SelectState = "default" | "disabled";
export type SelectOptionState = SelectState | "hovered" | "selected";

export interface SelectStyles {
  root?: Partial<Record<SelectState, SelectRootProps["style"]>>;
  trigger?: Partial<Record<SelectState, SelectTriggerProps["style"]>>;
  value?: Partial<Record<SelectState, SelectValueProps["style"]>>;
  placeholder?: Partial<Record<SelectState, SelectValueProps["style"]>>;
  overlay?: Partial<Record<SelectState, SelectOverlayProps["style"]>>;
  content?: Partial<Record<SelectState, SelectContentProps["style"]>>;
  option?: Partial<Record<SelectOptionState, SelectOptionProps["style"]>>;
}

export interface SelectOption {
  value: string;
  label: string;
}

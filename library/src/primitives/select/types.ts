import { SelectRootProps } from "./select-root";
import { SelectTriggerProps } from "./select-trigger";
import { SelectValueProps } from "./select-value";
import { SelectOverlayProps } from "./select-overlay";
import { SelectContentProps } from "./select-content";
import { SelectOptionProps } from "./select-option";

export type SelectState = "default" | "disabled";

export interface SelectStyles {
  root?: Partial<Record<SelectState, SelectRootProps["style"]>>;
  trigger?: Partial<Record<SelectState, SelectTriggerProps["style"]>>;
  value?: Partial<Record<SelectState, SelectValueProps["style"]>>;
  overlay?: Partial<Record<SelectState, SelectOverlayProps["style"]>>;
  content?: Partial<Record<SelectState, SelectContentProps["style"]>>;
  option?: Partial<Record<SelectState, SelectOptionProps["style"]>>;
}

export interface SelectOption {
  value: string;
  label: string;
}

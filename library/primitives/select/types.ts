import { SelectRootProps } from "./select-root";
import { SelectTriggerProps } from "./select-trigger";
import { SelectContentProps } from "./select-content";
import { SelectOptionProps } from "./select-option";

export type SelectState = "default" | "disabled";

export interface SelectStyles {
  root?: Partial<Record<SelectState, SelectRootProps["style"]>>;
  trigger?: Partial<Record<SelectState, SelectTriggerProps["style"]>>;
  content?: Partial<Record<SelectState, SelectContentProps["style"]>>;
  option?: Partial<Record<SelectState, SelectOptionProps["style"]>>;
}

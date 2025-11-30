import { SelectRoot } from "./select-root";
import { SelectContent } from "./select-content";
import { SelectTrigger } from "./select-trigger";
import { SelectOption } from "./select-option";

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption,
};

export type { SelectRootProps } from "./select-root";
export type { SelectTriggerProps } from "./select-trigger";
export type { SelectContentProps } from "./select-content";
export type { SelectOptionProps } from "./select-option";
export type { SelectStyles } from "./types";
import { SelectContent } from "./components/select-content";
import { SelectOption } from "./components/select-option";
import { SelectOverlay } from "./components/select-overlay";
import { SelectPortal } from "./components/select-portal";
import { SelectRoot } from "./components/select-root";
import { SelectTrigger } from "./components/select-trigger";

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Portal: SelectPortal,
  Overlay: SelectOverlay,
  Content: SelectContent,
  Option: SelectOption,
};

export type { SelectContentProps } from "./components/select-content";
export type { SelectOptionProps } from "./components/select-option";
export type { SelectOverlayProps } from "./components/select-overlay";
export type { SelectPortalProps } from "./components/select-portal";
export type { SelectRootBaseProps, SelectRootProps } from "./components/select-root";
export type { SelectTriggerProps } from "./components/select-trigger";
export type { SelectStyles } from "./types";

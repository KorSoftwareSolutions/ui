import { ComboboxContent } from "./components/combobox-content";
import { ComboboxEmpty } from "./components/combobox-empty";
import { ComboboxOption } from "./components/combobox-option";
import { ComboboxOverlay } from "./components/combobox-overlay";
import { ComboboxPortal } from "./components/combobox-portal";
import { ComboboxRoot } from "./components/combobox-root";
import { ComboboxTrigger } from "./components/combobox-trigger";

export const Combobox = {
  Root: ComboboxRoot,
  Trigger: ComboboxTrigger,
  Portal: ComboboxPortal,
  Overlay: ComboboxOverlay,
  Content: ComboboxContent,
  Option: ComboboxOption,
  Empty: ComboboxEmpty,
};

export type { ComboboxContentProps } from "./components/combobox-content";
export type { ComboboxEmptyProps } from "./components/combobox-empty";
export type { ComboboxOptionProps } from "./components/combobox-option";
export type { ComboboxOverlayProps } from "./components/combobox-overlay";
export type { ComboboxPortalProps } from "./components/combobox-portal";
export type { ComboboxRootProps } from "./components/combobox-root";
export type { ComboboxTriggerProps } from "./components/combobox-trigger";
export type { ComboboxStyles } from "./types";

import type { AutocompleteContentProps } from "./components/autocomplete-content";
import type { AutocompleteEmptyProps } from "./components/autocomplete-empty";
import type { AutocompleteInputProps } from "./components/autocomplete-input";
import type { AutocompleteOptionProps } from "./components/autocomplete-option";
import type { AutocompleteOverlayProps } from "./components/autocomplete-overlay";
import type { AutocompleteRootProps } from "./components/autocomplete-root";

export type AutocompleteState = "default" | "focused" | "disabled";
export type AutocompleteOptionState = AutocompleteState | "hovered" | "selected";

export interface AutocompleteStyles {
  root?: Partial<Record<AutocompleteState, AutocompleteRootProps["style"]>>;
  input?: Partial<Record<AutocompleteState, AutocompleteInputProps["style"]>> &
    Pick<AutocompleteInputProps, "placeholderTextColor" | "selectionColor">;
  overlay?: Partial<Record<AutocompleteState, AutocompleteOverlayProps["style"]>>;
  content?: Partial<Record<AutocompleteState, AutocompleteContentProps["style"]>>;
  option?: Partial<Record<AutocompleteOptionState, AutocompleteOptionProps["style"]>>;
  empty?: Partial<Record<AutocompleteState, AutocompleteEmptyProps["style"]>>;
}

export interface AutocompleteOption {
  value: string;
  label: string;
}

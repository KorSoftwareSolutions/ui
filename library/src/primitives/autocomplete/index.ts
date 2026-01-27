import { AutocompleteContent } from "./autocomplete-content";
import { AutocompleteEmpty } from "./autocomplete-empty";
import { AutocompleteInput } from "./autocomplete-input";
import { AutocompleteOption } from "./autocomplete-option";
import { AutocompleteOverlay } from "./autocomplete-overlay";
import { AutocompletePortal } from "./autocomplete-portal";
import { AutocompleteRoot } from "./autocomplete-root";

export const Autocomplete = {
  Root: AutocompleteRoot,
  Input: AutocompleteInput,
  Portal: AutocompletePortal,
  Overlay: AutocompleteOverlay,
  Content: AutocompleteContent,
  Option: AutocompleteOption,
  Empty: AutocompleteEmpty,
};

export type { AutocompleteContentProps } from "./autocomplete-content";
export type { AutocompleteEmptyProps } from "./autocomplete-empty";
export type { AutocompleteInputProps } from "./autocomplete-input";
export type { AutocompleteOptionProps } from "./autocomplete-option";
export type { AutocompleteOverlayProps } from "./autocomplete-overlay";
export type { AutocompletePortalProps } from "./autocomplete-portal";
export type { AutocompleteRootBaseProps, AutocompleteRootProps } from "./autocomplete-root";
export { useAutocomplete } from "./context";
export type { AutocompleteOption, AutocompleteOptionState, AutocompleteState, AutocompleteStyles } from "./types";

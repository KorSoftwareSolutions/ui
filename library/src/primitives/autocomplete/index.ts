import { AutocompleteContent } from "./components/autocomplete-content";
import { AutocompleteEmpty } from "./components/autocomplete-empty";
import { AutocompleteInput } from "./components/autocomplete-input";
import { AutocompleteOption } from "./components/autocomplete-option";
import { AutocompleteOverlay } from "./components/autocomplete-overlay";
import { AutocompletePortal } from "./components/autocomplete-portal";
import { AutocompleteRoot } from "./components/autocomplete-root";

export const Autocomplete = {
  Root: AutocompleteRoot,
  Input: AutocompleteInput,
  Portal: AutocompletePortal,
  Overlay: AutocompleteOverlay,
  Content: AutocompleteContent,
  Option: AutocompleteOption,
  Empty: AutocompleteEmpty,
};

export type { AutocompleteContentProps } from "./components/autocomplete-content";
export type { AutocompleteEmptyProps } from "./components/autocomplete-empty";
export type { AutocompleteInputProps } from "./components/autocomplete-input";
export type { AutocompleteOptionProps } from "./components/autocomplete-option";
export type { AutocompleteOverlayProps } from "./components/autocomplete-overlay";
export type { AutocompletePortalProps } from "./components/autocomplete-portal";
export type { AutocompleteRootBaseProps, AutocompleteRootProps } from "./components/autocomplete-root";
export { useAutocomplete } from "./context";
export type { AutocompleteOption, AutocompleteOptionState, AutocompleteState, AutocompleteStyles } from "./types";

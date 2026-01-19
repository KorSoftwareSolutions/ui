import React from "react";
import { Portal } from "../portal";
import { AutocompleteContext, useAutocomplete } from "./context";

export interface AutocompletePortalProps {
  children?: React.ReactNode;
}

export function AutocompletePortal(props: AutocompletePortalProps) {
  const autocomplete = useAutocomplete();

  return (
    <Portal name="autocomplete-portal">
      <AutocompleteContext.Provider value={autocomplete}>{props.children}</AutocompleteContext.Provider>
    </Portal>
  );
}

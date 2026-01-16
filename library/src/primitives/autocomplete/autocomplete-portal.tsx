import React, { useEffect } from "react";
import { Portal } from "../portal";
import { useAutocomplete, AutocompleteContext } from "./context";

export interface AutocompletePortalProps {
  children?: React.ReactNode;
}

export function AutocompletePortal(props: AutocompletePortalProps) {
  const autocomplete = useAutocomplete();

  useEffect(() => {
    return () => {
      autocomplete.setOptions([]);
    };
  }, []);

  if (!autocomplete.isOpen) {
    return null;
  }

  return (
    <Portal name="autocomplete-portal">
      <AutocompleteContext.Provider value={autocomplete}>{props.children}</AutocompleteContext.Provider>
    </Portal>
  );
}

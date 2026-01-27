import type { LayoutPosition } from "@/hooks";
import type { TextInputRef } from "@/types/element.types";
import React, { createContext, type Dispatch, useContext } from "react";
import type { LayoutRectangle } from "react-native";
import type { AutocompleteOption, AutocompleteState, AutocompleteStyles } from "./types";

export interface AutocompleteContext {
  value?: string;
  onChange?: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;

  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  inputPosition: LayoutPosition;
  setInputPosition: Dispatch<React.SetStateAction<LayoutPosition>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;

  options: Array<AutocompleteOption>;
  setOptions: Dispatch<React.SetStateAction<Array<AutocompleteOption>>>;

  openOnFocus: boolean;

  inputRef: TextInputRef | null;
  setInputRef: Dispatch<React.SetStateAction<TextInputRef | null>>;

  isDisabled: boolean;

  state: AutocompleteState;
  styles: AutocompleteStyles | null;
}

export const AutocompleteContext = createContext<AutocompleteContext | undefined>(undefined);

export const useAutocomplete = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error("useAutocomplete must be used within an AutocompleteProvider");
  }
  return context;
};

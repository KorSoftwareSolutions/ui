import { createContext, type Dispatch, useContext } from "react";
import type { LayoutRectangle } from "react-native";
import type { LayoutPosition } from "../../hooks";
import type { TextInputRef } from "../../types/element.types";
import type { ComboboxState, ComboboxStyles } from "./types";

export interface ComboboxContext {
  items: readonly any[];

  value: any | undefined;
  onChange: (item: any) => void;

  inputValue: string;
  onInputChange: (text: string) => void;

  getItemValue: (item: any) => string;
  getItemLabel: (item: any) => string;

  inputRef: React.RefObject<TextInputRef | null>;

  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  triggerPosition: LayoutPosition;
  setTriggerPosition: Dispatch<React.SetStateAction<LayoutPosition>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;

  isDisabled: boolean;

  state: ComboboxState;
  styles: ComboboxStyles;
}

export const ComboboxContext = createContext<ComboboxContext | undefined>(undefined);

export const useCombobox = () => {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error("useCombobox must be used within a ComboboxProvider");
  }
  return context;
};

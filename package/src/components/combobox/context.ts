import { createContext, type Dispatch, useContext } from "react";
import type { LayoutRectangle } from "react-native";
import type { LayoutPosition } from "../../hooks";
import type { ComboboxState, ComboboxStyles } from "./types";

export interface ComboboxContext {
  items: readonly unknown[];
  filteredItems: readonly unknown[];
  getItemValue: (item: unknown) => string;
  getItemLabel: (item: unknown) => string;

  value: unknown | undefined;
  onChange: ((item: unknown) => void) | undefined;

  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  triggerPosition: LayoutPosition;
  setTriggerPosition: Dispatch<React.SetStateAction<LayoutPosition>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;

  inputValue: string;
  setInputValue: Dispatch<React.SetStateAction<string>>;

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

import { createContext, Dispatch, useContext } from "react";
import { SelectOption, SelectState, SelectStyles } from "./types";
import { LayoutRectangle } from "react-native";

export interface SelectContext {
  value: string | null;
  onChange?: (value: string) => void;
  placeholder: string | null;

  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  triggerLayout: LayoutRectangle | null;
  setTriggerLayout: Dispatch<React.SetStateAction<LayoutRectangle | null>>;
  options: Array<SelectOption>;
  setOptions: Dispatch<React.SetStateAction<Array<SelectOption>>>;

  disabled: boolean;

  state: SelectState;
  styles: SelectStyles | null;
}

export const SelectContext = createContext<SelectContext | undefined>(undefined);

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a SelectProvider");
  }
  return context;
};

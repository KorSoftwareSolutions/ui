import { createContext, Dispatch, useContext } from "react";
import { SelectState, SelectStyles } from "./types";

export interface SelectContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;

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

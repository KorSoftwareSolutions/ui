import type { LayoutPosition } from "@/hooks";
import { createContext, type Dispatch, useContext } from "react";
import type { LayoutRectangle } from "react-native";
import type { SelectOption, SelectState, SelectStyles } from "./types";

export interface SelectContext {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;

  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  triggerPosition: LayoutPosition;
  setTriggerPosition: Dispatch<React.SetStateAction<LayoutPosition>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;
  options: Array<SelectOption>;
  setOptions: Dispatch<React.SetStateAction<Array<SelectOption>>>;

  isDisabled: boolean;

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

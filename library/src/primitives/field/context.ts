import { createContext, useContext } from "react";
import { FieldState, FieldStyles } from "./types";

export interface FieldContext {
  value: string | null;
  onChange?: (value: string) => void;

  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;

  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;

  disabled?: boolean;
  required?: boolean;
  error?: string | null;

  state: FieldState;
  styles?: FieldStyles<unknown>;
}

export const FieldContext = createContext<FieldContext | undefined>(undefined);

export const useField = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useField must be used within a FieldProvider");
  }
  return context;
};

import { createContext, useContext } from "react";
import { ButtonState, ButtonStyles } from "./types";

export interface ButtonContext {
  disabled?: boolean;

  state: ButtonState;
  styles?: ButtonStyles;
}

export const ButtonContext = createContext<ButtonContext | undefined>(undefined);

export const useButton = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButton must be used within a ButtonProvider");
  }
  return context;
};

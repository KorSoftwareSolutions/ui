import { createContext, useContext } from "react";
import type { ButtonState, ButtonStyles } from "./types";

export interface ButtonContext {
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

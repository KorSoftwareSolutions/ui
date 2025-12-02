import { createContext, useContext } from "react";
import { ButtonState, ButtonStyles } from "./types";

export interface ButtonPrimitiveContext {
  disabled?: boolean;

  state: ButtonState;
  styles?: ButtonStyles;
}

export const ButtonPrimitiveContext = createContext<ButtonPrimitiveContext | undefined>(undefined);

export const useButtonPrimitive = () => {
  const context = useContext(ButtonPrimitiveContext);
  if (!context) {
    throw new Error("useButtonPrimitive must be used within a ButtonPrimitiveProvider");
  }
  return context;
};

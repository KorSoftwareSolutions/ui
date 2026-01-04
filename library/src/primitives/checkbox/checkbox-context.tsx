import React from "react";
import type { CheckboxState, CheckboxStyles } from "./types";

export interface CheckboxPrimitiveContextValue {
  value: boolean;
  isDisabled?: boolean;
  state: CheckboxState;
  styles?: CheckboxStyles;
}

export const CheckboxPrimitiveContext = React.createContext<CheckboxPrimitiveContextValue | null>(null);

export const useCheckboxContext = () => {
  const context = React.useContext(CheckboxPrimitiveContext);
  if (!context) {
    throw new Error("Checkbox compound components must be used within CheckboxPrimitive.Root");
  }
  return context;
};

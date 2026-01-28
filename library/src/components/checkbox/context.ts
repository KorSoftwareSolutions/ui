import React from "react";
import type { CheckboxState, CheckboxStyles } from "./types";

export interface CheckboxContextValue {
  value: boolean;
  isDisabled?: boolean;
  state: CheckboxState;
  styles?: CheckboxStyles;
}

export const CheckboxContext = React.createContext<CheckboxContextValue | null>(null);

export const useCheckboxContext = () => {
  const context = React.useContext(CheckboxContext);
  if (!context) {
    throw new Error("Checkbox compound components must be used within Checkbox.Root");
  }
  return context;
};

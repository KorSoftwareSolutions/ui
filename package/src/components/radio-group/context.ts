import React from "react";
import type { RadioGroupState, RadioGroupStyles } from "./types";

export interface RadioGroupContextValue {
  value?: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  state: RadioGroupState;
  styles?: RadioGroupStyles;
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroup compound components must be used within RadioGroup.Root");
  }
  return context;
};

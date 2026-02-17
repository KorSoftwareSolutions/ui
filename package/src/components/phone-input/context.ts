import { createContext, useContext } from "react";
import type { PhoneMask } from "../../hooks";
import type { ViewRef } from "../../types/element.types";
import type { PhoneInputState, PhoneInputStyles } from "./types";

export interface PhoneInputContext {
  value: string | undefined;
  onChange: ((value: string) => void) | undefined;

  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  isDisabled: boolean;

  triggerRef: React.RefObject<ViewRef | null>;

  phoneMask: PhoneMask;

  state: PhoneInputState;
  styles: PhoneInputStyles;
}

export const PhoneInputContext = createContext<PhoneInputContext | undefined>(
  undefined,
);

export const usePhoneInput = () => {
  const context = useContext(PhoneInputContext);
  if (!context) {
    throw new Error("usePhoneInput must be used within a PhoneInputRoot");
  }
  return context;
};

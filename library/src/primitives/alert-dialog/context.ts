import React, { createContext, useContext, type Dispatch } from "react";
import type { AlertDialogStyles } from "./types";

export interface AlertDialogPrimitiveContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  styles?: AlertDialogStyles;
}

export const AlertDialogPrimitiveContext = createContext<AlertDialogPrimitiveContextValue | null>(null);

export const useAlertDialog = () => {
  const context = useContext(AlertDialogPrimitiveContext);
  if (!context) {
    throw new Error("AlertDialog compound components must be used within AlertDialogPrimitive.Root");
  }
  return context;
};

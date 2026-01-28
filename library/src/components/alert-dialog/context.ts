import React, { createContext, useContext, type Dispatch } from "react";
import type { AlertDialogStyles } from "./types";

export interface AlertDialogContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  styles?: AlertDialogStyles;
}

export const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog compound components must be used within AlertDialog.Root");
  }
  return context;
};

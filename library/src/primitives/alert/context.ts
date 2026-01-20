import { createContext, useContext } from "react";
import type { AlertStyles } from "./types";

export interface AlertContext {
  styles?: AlertStyles;
}

export const AlertContext = createContext<AlertContext | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertRoot");
  }
  return context;
};

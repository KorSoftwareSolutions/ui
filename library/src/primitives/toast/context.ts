import { createContext, useContext } from "react";
import { ToastStyles } from "./types";

export interface ToastContext {
  styles?: ToastStyles;
}

export const ToastContext = createContext<ToastContext | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

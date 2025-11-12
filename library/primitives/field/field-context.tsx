import { createContext, useContext } from "react";

export interface FieldContext {
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export const FieldContext = createContext<FieldContext | undefined>(undefined);

export const useField = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useField must be used within a FieldProvider");
  }
  return context;
};

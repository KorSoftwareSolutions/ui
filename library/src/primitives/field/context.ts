import { createContext, useContext } from "react";
import { FieldStyles } from "./types";

export interface FieldContext {
  styles?: FieldStyles;
  id: string;
}

export const FieldContext = createContext<FieldContext | undefined>(undefined);

export const useField = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useField must be used within a FieldProvider");
  }
  return context;
};

export const useFieldOptional = () => {
  return useContext(FieldContext);
};

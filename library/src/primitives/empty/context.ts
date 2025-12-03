import { createContext, useContext } from "react";
import { EmptyStyles } from "./types";

export interface EmptyContext {
  styles?: EmptyStyles;
}

export const EmptyContext = createContext<EmptyContext>({});

export const useEmpty = () => {
  const context = useContext(EmptyContext);
  if (!context) {
    throw new Error("useEmptyContext must be used within a EmptyProvider");
  }
  return context;
};

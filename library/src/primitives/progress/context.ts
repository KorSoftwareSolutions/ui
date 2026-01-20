import { createContext, useContext } from "react";
import type { ProgressState, ProgressStyles } from "./types";

export interface ProgressContext {
  state: ProgressState;
  styles?: ProgressStyles;
  value: number;
  max: number;
}

export const ProgressContext = createContext<ProgressContext | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressRoot");
  }
  return context;
};

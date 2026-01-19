import { createContext, useContext } from "react";
import type { SafeAreaContextValue } from "./types";

const SafeAreaContext = createContext<SafeAreaContextValue | null>(null);

export const useSafeAreaInsets = () => {
  const context = useContext(SafeAreaContext);
  if (!context) {
    throw new Error("useSafeAreaInsets must be used within SafeAreaProvider");
  }
  return context.insets;
};

export { SafeAreaContext };

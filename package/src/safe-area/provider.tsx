import { type PropsWithChildren } from "react";
import { SafeAreaContext } from "./context";
import type { SafeAreaInsets } from "./types";

export interface SafeAreaProviderProps extends PropsWithChildren {
  insets?: SafeAreaInsets;
}

export const SafeAreaProvider = ({ children, insets }: SafeAreaProviderProps) => {
  const defaultInsets: SafeAreaInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const calculatedInsets: SafeAreaInsets = { ...defaultInsets, ...insets };

  return (
    <SafeAreaContext.Provider
      value={{
        insets: calculatedInsets,
      }}
    >
      {children}
    </SafeAreaContext.Provider>
  );
};

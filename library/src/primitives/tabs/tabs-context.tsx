import React, { useContext } from "react";
import type { TabsStyles } from "./types";

export interface TabsPrimitiveContextValue {
  value: string;
  onChange: (value: string) => void;
  styles?: TabsStyles;
}

export const TabsPrimitiveContext = React.createContext<TabsPrimitiveContextValue | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsPrimitiveContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within TabsPrimitive.Root");
  }
  return context;
};

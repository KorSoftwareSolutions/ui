import React, { useContext } from "react";
import type { TabsStyles } from "./types";

export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  styles?: TabsStyles;
}

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within Tabs.Root");
  }
  return context;
};

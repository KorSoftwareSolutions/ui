import { createContext, useContext } from "react";
import type { SidebarState, SidebarStyles } from "./types";

export interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  width?: number;
  styles?: SidebarStyles;
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

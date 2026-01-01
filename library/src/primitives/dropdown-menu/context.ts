import type { LayoutPosition } from "@/hooks/use-relative-position";
import { createContext, type Dispatch, useContext } from "react";
import type { LayoutRectangle } from "react-native";
import type { DropdownMenuStyles } from "./types";

export interface DropdownMenuContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  triggerPosition: LayoutPosition;
  setTriggerPosition: Dispatch<React.SetStateAction<LayoutPosition>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;

  styles?: DropdownMenuStyles;
}

export const DropdownMenuContext = createContext<DropdownMenuContext | undefined>(undefined);

export const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenuRoot");
  }
  return context;
};

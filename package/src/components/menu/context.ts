import type { LayoutPosition } from "../../hooks/use-relative-position";
import { createContext, type Dispatch, useContext } from "react";
import type { LayoutRectangle } from "react-native";
import type { MenuStyles } from "./types";

export interface MenuContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  triggerPosition: LayoutPosition;
  setTriggerPosition: Dispatch<React.SetStateAction<LayoutPosition>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;

  styles?: MenuStyles;
}

export const MenuContext = createContext<MenuContext | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuRoot");
  }
  return context;
};

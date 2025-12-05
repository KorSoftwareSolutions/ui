import { createContext, Dispatch, useContext } from "react";
import { PopoverStyles } from "./types";
import { LayoutRectangle } from "react-native";
import { LayoutPosition } from "@/hooks/use-relative-position";

export interface PopoverContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  contentLayout: LayoutRectangle;
  setContentLayout: Dispatch<React.SetStateAction<LayoutRectangle>>;
  triggerPosition: LayoutPosition;
  setTriggerPosition: Dispatch<React.SetStateAction<LayoutPosition>>;

  styles?: PopoverStyles;
}

export const PopoverContext = createContext<PopoverContext | undefined>(undefined);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverRoot");
  }
  return context;
};

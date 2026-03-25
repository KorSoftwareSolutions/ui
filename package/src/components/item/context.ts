import { createContext, useContext } from "react";
import type { ItemState, ItemStyles } from "./types";

export interface ItemContext {
  state: ItemState;
  styles?: ItemStyles;
  size: "default" | "sm" | "xs";
}

export const ItemContext = createContext<ItemContext | undefined>(undefined);

export const useItem = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItem must be used within an Item.Root");
  }
  return context;
};

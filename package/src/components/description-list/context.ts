import { createContext, useContext } from "react";
import type { DescriptionListState, DescriptionListStyles } from "./types";

export interface DescriptionListContext {
  state: DescriptionListState;
  styles?: DescriptionListStyles;
}

export const DescriptionListContext = createContext<DescriptionListContext | undefined>(undefined);

export const useDescriptionList = () => {
  const context = useContext(DescriptionListContext);
  if (!context) {
    throw new Error("useDescriptionList must be used within a DescriptionList.Root");
  }
  return context;
};

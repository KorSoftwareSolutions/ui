import { createContext, useContext } from "react";
import { BadgeState, BadgeStyles } from "./types";

export interface BadgeContext {
  state: BadgeState;
  styles?: BadgeStyles;
}

export const BadgeContext = createContext<BadgeContext | undefined>(undefined);

export const useBadge = () => {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadge must be used within a BadgeProvider");
  }
  return context;
};

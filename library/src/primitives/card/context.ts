import { createContext, useContext } from "react";
import { CardState, CardStyles } from "./types";

export interface CardContext {
  state: CardState;
  styles?: CardStyles;
}

export const CardContext = createContext<CardContext | undefined>(undefined);

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};

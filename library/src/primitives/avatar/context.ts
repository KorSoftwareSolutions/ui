import { createContext, useContext } from "react";
import { AvatarStyles } from "./types";

export interface AvatarContext {
  styles?: AvatarStyles;
}

export const AvatarContext = createContext<AvatarContext | undefined>(undefined);

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatarContext must be used within a AvatarProvider");
  }
  return context;
};

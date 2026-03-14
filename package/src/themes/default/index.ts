import type { ThemeAssets } from "../types";
import { darkColors, lightColors } from "./colors";

export const defaultThemeAssets: ThemeAssets = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  radius: 8,
  spacing: 7,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};

import type { ThemeAssets } from "../types";
import { darkColors, lightColors } from "./colors";

export const defaultThemeAssets: ThemeAssets = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  radius: 10,
  spacing: 6,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};

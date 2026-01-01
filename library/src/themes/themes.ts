import { defaultThemeAssets } from "./default";
import type { ThemeAssets, ThemeName } from "./types";

export const themes: Record<ThemeName, ThemeAssets> = {
  default: defaultThemeAssets,
};

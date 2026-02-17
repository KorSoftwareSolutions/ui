import type { DeepPartial } from "../types/util.types";
import type { ThemeAssets } from "./types";

export function mergeThemeAssets(
  base: ThemeAssets,
  override: DeepPartial<ThemeAssets>,
): ThemeAssets {
  return {
    colors: {
      light: { ...base.colors.light, ...override.colors?.light },
      dark: { ...base.colors.dark, ...override.colors?.dark },
    },
    radius: override.radius ?? base.radius,
    fontFamily: override.fontFamily ?? base.fontFamily,
    letterSpacing: override.letterSpacing ?? base.letterSpacing,
    fontSize: override.fontSize ?? base.fontSize,
  };
}

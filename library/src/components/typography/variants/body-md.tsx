import { useThemedStyles } from "@/utils/use-themed-styles";
import { type TextStyle } from "react-native";

export function useTextVariantBodyMd(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize,
      fontFamily,
      letterSpacing,
    })
  );
}

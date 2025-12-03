import { useThemedStyles } from "@/utils/use-themed-styles";
import { TextStyle } from "react-native";

export function useTextVariantBodySm(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize: fontSize * 0.875,
      fontFamily,
      letterSpacing,
    })
  );
}

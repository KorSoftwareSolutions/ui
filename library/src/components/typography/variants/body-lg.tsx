import { useThemedStyles } from "@/utils/use-themed-styles";
import { TextStyle } from "react-native";

export function useTextVariantBodyLg(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize: fontSize * 1.25,
      fontFamily,
      letterSpacing,
    })
  );
}

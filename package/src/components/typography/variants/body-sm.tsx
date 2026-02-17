import { type TextStyle } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useTextVariantBodySm(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize: fontSize * 0.875,
      fontFamily,
      letterSpacing,
      lineHeight: fontSize * 1.5,
    }),
  );
}

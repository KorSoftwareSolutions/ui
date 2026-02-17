import { type TextStyle } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useTextVariantBodyLg(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize: fontSize * 1.25,
      fontFamily,
      letterSpacing,
      lineHeight: fontSize * 1.5,
    }),
  );
}

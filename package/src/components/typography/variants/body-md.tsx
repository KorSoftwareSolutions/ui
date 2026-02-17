import { type TextStyle } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useTextVariantBodyMd(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize,
      fontFamily,
      letterSpacing,
      lineHeight: fontSize * 1.5,
    }),
  );
}

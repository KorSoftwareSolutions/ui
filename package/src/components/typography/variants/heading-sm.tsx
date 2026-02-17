import { type TextStyle } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useTextVariantHeadingSm(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize,
      fontFamily,
      letterSpacing,
      fontWeight: "600",
      lineHeight: fontSize * 1.2,
    }),
  );
}

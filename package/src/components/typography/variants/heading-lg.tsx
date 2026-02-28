import { type TextStyle } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useTextVariantHeadingLg(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.foreground,
      fontSize: fontSize * 1.5,
      fontFamily,
      letterSpacing,
      fontWeight: "600",
      lineHeight: fontSize * 1.75,
    }),
  );
}

import { type TextStyle } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useLinkVariantDefault(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => ({
      color: colors.primary,
      fontSize,
      fontFamily,
      textDecorationLine: "underline",
      letterSpacing,
    }),
  );
}

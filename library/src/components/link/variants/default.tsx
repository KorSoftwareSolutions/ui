import { useThemedStyles } from "@/utils/use-themed-styles";
import { TextStyle } from "react-native";

export function useLinkVariantDefault(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing }): TextStyle => ({
      color: colors.primary,
      fontSize: 16,
      fontFamily,
      textDecorationLine: "underline",
      letterSpacing,
    })
  );
}

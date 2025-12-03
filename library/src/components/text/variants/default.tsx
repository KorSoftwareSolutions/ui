import { useThemedStyles } from "@/utils/use-themed-styles";
import { TextStyle } from "react-native";

export function useInputVariantDefault(): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing }): TextStyle => ({
      color: colors.foreground,
      fontSize: 16,
      fontFamily,
      letterSpacing,
    })
  );
}

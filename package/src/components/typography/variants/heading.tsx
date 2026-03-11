import { type TextStyle } from "react-native";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";

const headingScale: Record<Size, number> = {
  sm: 1,
  md: 1.25,
  lg: 1.5,
};

export function useTextVariantHeading(size: Size): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => {
      const scale = headingScale[size];
      const scaledFontSize = fontSize * scale;
      const lineHeight = Math.round(scaledFontSize * 1.25);
      return {
        color: colors.foreground,
        fontSize: scaledFontSize,
        lineHeight,
        fontFamily,
        letterSpacing,
        fontWeight: "600",
      };
    },
  );
}

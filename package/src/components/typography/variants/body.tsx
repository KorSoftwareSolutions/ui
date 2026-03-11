import { type TextStyle } from "react-native";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";

const bodyScale: Record<Size, number> = {
  sm: 0.875,
  md: 1,
  lg: 1.25,
};

export function useTextVariantBody(size: Size): TextStyle {
  return useThemedStyles(
    ({ colors, fontFamily, letterSpacing, fontSize }): TextStyle => {
      const scale = bodyScale[size];
      const scaledFontSize = fontSize * scale;
      const lineHeight = Math.round(scaledFontSize * 1.25);
      return {
        color: colors.foreground,
        fontSize: scaledFontSize,
        lineHeight,
        fontFamily,
        letterSpacing,
      };
    },
  );
}

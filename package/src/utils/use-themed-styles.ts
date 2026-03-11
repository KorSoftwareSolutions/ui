import { useTheme } from "../themes";
import type { Colors, FontFamily, FontSize, LetterSpacing, Radius } from "../themes/types";
import { getSizeScale, type Size } from "./size-scale";

type SizeScale = ReturnType<typeof getSizeScale>;

interface CallbackProps {
  colors: Colors;
  radius: Radius;
  fontFamily: FontFamily;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
  spacing: number;
  /** Compute spacing-based size dimensions from a Size token */
  sizeScale: (size: Size) => SizeScale;
}

export const useThemedStyles = <T>(callback: (props: CallbackProps) => T): T => {
  const theme = useTheme();
  return callback({
    colors: theme.colors,
    radius: theme.radius,
    fontFamily: theme.fontFamily,
    letterSpacing: theme.letterSpacing,
    fontSize: theme.fontSize,
    spacing: theme.spacing,
    sizeScale: (size: Size) => getSizeScale(size, theme.spacing, theme.fontSize),
  });
};

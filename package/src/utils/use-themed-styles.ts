import { useTheme } from "../themes";
import type {
  Colors,
  FontFamily,
  FontSize,
  LetterSpacing,
  Radius,
} from "../themes/types";

interface CallbackProps {
  colors: Colors;
  radius: Radius;
  fontFamily: FontFamily;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
}

export const useThemedStyles = <T>(
  callback: (props: CallbackProps) => T,
): T => {
  const theme = useTheme();
  return callback({
    colors: theme.colors,
    radius: theme.radius,
    fontFamily: theme.fontFamily,
    letterSpacing: theme.letterSpacing,
    fontSize: theme.fontSize,
  });
};

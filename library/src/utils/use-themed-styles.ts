import { useTheme } from "@/themes";
import { Colors, Radius } from "@/themes/types";

interface CallbackProps {
  colors: Colors;
  radius: Radius;
}

export const useThemedStyles = <T>(callback: (props: CallbackProps) => T): T => {
  const theme = useTheme();
  return callback({ colors: theme.colors, radius: theme.radius });
};

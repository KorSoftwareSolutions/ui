import { useTheme } from "@/themes";
import { Colors } from "@/themes/types";

interface CallbackProps {
  colors: Colors;
}

export const useThemedStyles = <T>(callback: (props: CallbackProps) => T): T => {
  const theme = useTheme();
  return callback({ colors: theme.colors });
};

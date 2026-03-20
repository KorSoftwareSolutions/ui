import { Platform } from "react-native";

export const focusPreventProps = Platform.select({
  web: {
    onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
  },
  default: {},
});

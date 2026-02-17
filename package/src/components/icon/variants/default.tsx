import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type IconProps } from "../icon";

export function useIconVariantDefault(): IconProps {
  return useThemedStyles(
    ({ colors, fontSize }): IconProps => ({
      color: colors.foreground,
      size: fontSize * 1.5,
      strokeWidth: 2,
    }),
  );
}

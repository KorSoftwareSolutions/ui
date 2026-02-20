import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { IconButtonStyles } from "../types";

export const useIconButtonVariantDefault = (): IconButtonStyles => {
  return useThemedStyles(
    ({ colors, radius }): IconButtonStyles => ({
      root: {
        default: {
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          borderRadius: radius,
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderColor: colors.border,
        },
        disabled: {
          opacity: 0.5,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.primary, -10),
        },
      },
      icon: {
        default: {
          color: colors.primaryForeground,
        },
      },
    }),
  );
};

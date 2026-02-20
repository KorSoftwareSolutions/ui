import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { IconButtonStyles } from "../types";

export const useIconButtonVariantSecondary = (): IconButtonStyles => {
  return useThemedStyles(
    ({ colors, radius }): IconButtonStyles => ({
      root: {
        default: {
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          borderRadius: radius,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.secondary,
        },
        disabled: {
          opacity: 0.5,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.secondary, -1),
        },
      },
      icon: {
        default: {
          color: colors.secondaryForeground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
    }),
  );
};

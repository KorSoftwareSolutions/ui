import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { IconButtonStyles } from "../types";

export const useIconButtonVariantGhost = (): IconButtonStyles => {
  return useThemedStyles(
    ({ colors, radius }): IconButtonStyles => ({
      root: {
        default: {
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          borderRadius: radius,
          backgroundColor: "transparent",
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
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
    }),
  );
};

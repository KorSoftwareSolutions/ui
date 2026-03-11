import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { IconButtonStyles } from "../types";

export const useIconButtonVariantGhost = (size: Size): IconButtonStyles => {
  return useThemedStyles(({ colors, radius, sizeScale }): IconButtonStyles => {
    const s = sizeScale(size);

    return {
      root: {
        default: {
          alignItems: "center",
          justifyContent: "center",
          height: s.height,
          width: s.height,
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
          size: s.iconSize,
          strokeWidth: s.strokeWidth,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
    };
  });
};

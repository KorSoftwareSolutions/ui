import type { CursorValue } from "react-native";
import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { ButtonStyles } from "../types";

export const useButtonVariantSecondary = (size: Size): ButtonStyles => {
  return useThemedStyles(({ colors, radius, fontFamily, sizeScale }): ButtonStyles => {
    const sizeStyles = sizeScale(size);

    return {
      root: {
        default: {
          flexDirection: "row",
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          borderRadius: radius,
          gap: sizeStyles.gap,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.secondary,
          cursor: "pointer",
        },
        disabled: {
          opacity: 0.5,
          cursor: "not-allowed" as CursorValue,
        },
        loading: {
          opacity: 0.5,
          cursor: "wait" as CursorValue,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.secondary, -1),
        },
      },
      text: {
        default: {
          color: colors.secondaryForeground,
          fontSize: sizeStyles.fontSize,
          fontFamily,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
      icon: {
        default: {
          color: colors.secondaryForeground,
          size: sizeStyles.iconSize,
          strokeWidth: sizeStyles.strokeWidth,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
      spinner: {
        default: {
          color: colors.secondaryForeground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
    };
  });
};

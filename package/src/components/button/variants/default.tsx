import type { CursorValue } from "react-native";
import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { ButtonStyles } from "../types";

export const useButtonVariantDefault = (size: Size): ButtonStyles => {
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
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderColor: colors.border,
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
          backgroundColor: hslaSetRelativeLightness(colors.primary, -10),
        },
      },
      text: {
        default: {
          color: colors.primaryForeground,
          fontSize: sizeStyles.fontSize,
          fontFamily,
        },
      },
      icon: {
        default: {
          color: colors.primaryForeground,
          size: sizeStyles.iconSize,
          strokeWidth: sizeStyles.strokeWidth,
        },
      },
      spinner: {
        default: {
          color: colors.primaryForeground,
        },
      },
    };
  });
};

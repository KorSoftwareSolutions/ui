import type { CursorValue } from "react-native";
import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { ButtonStyles } from "../types";

export const useButtonVariantSecondary = (): ButtonStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): ButtonStyles => ({
      root: {
        default: {
          flexDirection: "row",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: radius,
          gap: 8,
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
          fontSize,
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
          size: fontSize,
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
    }),
  );
};

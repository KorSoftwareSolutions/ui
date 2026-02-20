import type { CursorValue } from "react-native";
import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { ButtonStyles } from "../types";

export const useButtonVariantDefault = (): ButtonStyles => {
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
          fontSize,
          fontFamily,
        },
      },
      icon: {
        default: {
          color: colors.primaryForeground,
          size: fontSize,
        },
      },
      spinner: {
        default: {
          color: colors.primaryForeground,
        },
      },
    }),
  );
};

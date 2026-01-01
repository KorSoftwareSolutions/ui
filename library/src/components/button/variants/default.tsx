import { type ButtonStyles } from "@/primitives";
import { hslaSetRelativeLightness } from "@/utils/hsla-utils";
import { useThemedStyles } from "@/utils/use-themed-styles";

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
        },
        disabled: {
          opacity: 0.5,
        },
        loading: {
          opacity: 0.8,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.primary, -10),
        },
      },
      label: {
        default: {
          color: colors.primaryForeground,
          fontSize,
          fontWeight: "bold",
          fontFamily,
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
          color: colors.primaryForeground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
    })
  );
};
